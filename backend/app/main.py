import os
from datetime import timedelta, datetime
from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException, UploadFile
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from fastapi import status
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sso.sso.google import GoogleSSO
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.crud import utils
from app.models import model
from app.schemas import schema
from app.database.database import engine, SessionLocal
from app.config import Config
from app.auth.auth import verify_password, get_password_hash


os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
database_address = os.environ["DB_URL"]
frontend_address = os.environ["FRONTEND_URL"]

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "photos")), name="static")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


origins = [
    "http://localhost:8080",
    "http://localhost:8000*",
    "http://localhost:8000",
    "http://localhost:5050",
    "http://localhost:5432",
    f"http://{database_address}",
    f"http://{frontend_address}",
    "http://localhost:8000/google/login",
    "http://localhost:8000/api/v1/google/callback",
    "https://accounts.google.com/o/oauth2/v2/auth*",
    "https//accounts.google.com/v3/signin/identifier",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "Access-Control-Allow-Origin"],
)

def authenticate_doctor(db, username: str, password: str):
    doctor = utils.get_doctor_login(db, username)
    if not doctor:
        return False
    if not verify_password(password, doctor.password_hash):
        return False
    return doctor


def authenticate_admin(db, username: str, password: str):
    admin = utils.get_admin_login(db, username)
    if not admin:
        return False
    if not verify_password(password, admin.password_hash):
        return False
    return admin


def create_access_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, Config.secret, algorithm=Config.algorithm)
    return encoded_jwt


google_sso = GoogleSSO(Config.id, Config.key, allow_insecure_http=True)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_patient(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, Config.secret, algorithms=[Config.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schema.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = utils.get_patient(Depends(get_db), email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


async def get_current_admin(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, Config.secret, algorithms=[Config.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schema.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = utils.get_admin_login(Depends(get_db), email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


async def get_current_doctor(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, Config.secret, algorithms=[Config.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schema.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = utils.get_doctor_login(Depends(get_db), email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


@app.get("/")
async def root():
    return {"message": "The Patient Registration System is working."}


@app.post("/doctor/upload_photo", response_model=schema.Doctor)
async def doctor_upload_photo(file: UploadFile, doctor: Annotated[model.Doctor, Depends(get_current_doctor)],
                              db: Session = Depends(get_db)):
    name = datetime.now().strftime('%Y%m%d_%H%M%S')
    url = os.path.join("photos", name)
    with open(os.path.join(url), "wb") as server_file:
        server_file.write(file.read())
    return utils.set_doctor_profile_photo_url(db, doctor.doctor_id, f"static/{url}")


@app.get("/get/reservations/doctor/{doctor_id}")
async def get_doctor_reservations(doctor_id: int, db: Session = Depends(get_db)):
    return utils.doctor_reservations(db, doctor_id)


@app.get("/get/reservations/patient/{patient_id}")
async def get_patient_reservations(patient_email: str,
                                   patient: Annotated[model.Patient, Depends(get_current_patient)],
                                   db: Session = Depends(get_db)):
    if patient.email != patient_email:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return utils.patient_reservations(db, patient_email)


@app.post("/add")
async def make_appointment(patient: Annotated[model.Patient, Depends(get_current_patient)],
                           doctor_id: int, time: datetime, db: Session = Depends(get_db)):
    return utils.create_and_reserve_appointment(db, patient.email, doctor_id, time)


@app.post("/add/reservation")
async def add_reservation(reservation: schema.AddReservation, doctor: Annotated[model.Doctor, Depends(get_current_doctor)],
                          db: Session = Depends(get_db)):
    if doctor.doctor_id != reservation.doctor_id:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return utils.add_appointment(db, reservation)


@app.post("reservation/reserve/{reservation_id}")
async def reserve_appointment(reservation_id: int, patient: Annotated[model.Patient, Depends(get_current_patient)],
                              db: Session = Depends(get_db)):
    return utils.reserve_appointment(db, patient.email, reservation_id)


@app.post("reservation/release/{reservation_id}")
async def release_appointment(reservation_id: int, patient: Annotated[model.Patient, Depends(get_current_patient)],
                              db: Session = Depends(get_db)):
    if utils.get_appointment_patient(db, reservation_id) != patient.email:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=
        "This appointment is not reserved by this patient")
    return utils.release_appointment(db, reservation_id)


@app.delete("/delete/reservation")
async def delete_reservation(reservation_id: int, doctor: Annotated[model.Doctor, Depends(get_current_doctor)],
                             db: Session = Depends(get_db)):
    if doctor.email != utils.get_appointment_doctor(db, reservation_id):
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return utils.delete_appointment(db, reservation_id)


@app.get("/get/doctors", response_model=list[schema.Doctor])
async def get_doctors(db: Session = Depends(get_db)):
    return utils.get_all_doctors(db)


@app.get("/get/doctor/details")
async def get_doctor(doctor: Annotated[model.Doctor, Depends(get_current_doctor)], db: Session = Depends(get_db)):
    return utils.get_doctor(db, doctor_id=doctor.doctor_id)


@app.post("/register/doctor", response_model=schema.Doctor)
async def create_doctor(new_doctor: schema.DoctorCreate, admin: Annotated[model.Admin, Depends(get_current_admin)],
                        db: Session = Depends(get_db)):
    return utils.create_doctor(db, new_doctor)


@app.put("/update/doctor", response_model=schema.Doctor)
async def update_doctor(doctor: schema.DoctorUpdate, db_doctor: Annotated[model.Doctor, Depends(get_current_doctor)],
                        db: Session = Depends(get_db)):
    if db_doctor.doctor_id != doctor.doctor_id:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Cannot edit other's doctor details.")
    return utils.update_doctor(db, doctor)


@app.delete("/delete/doctor/{doctor_id}", response_model=schema.Doctor)
async def delete_doctor(doctor_id: int, admin: Annotated[model.Admin, Depends(get_current_admin)],
                        db: Session = Depends(get_db)):
    if admin is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized action")
    return utils.delete_doctor(db, doctor_id)


@app.get("/patient/measurements/{patient_id}")
async def get_patient_measurements(patient_email: str, doctor: Annotated[model.Doctor, Depends(get_current_doctor)],
                                                              db: Session = Depends(get_db)):
    #sprawdzanie czy lekarz który ma wizytę z pacjentem prosi o pomiary
    return utils.get_patient_measurements(db, patient_email)


@app.get("/patient/measurements/me")
async def get_patient_measurements(patient: Annotated[model.Patient, Depends(get_current_patient)],
                                   db: Session = Depends(get_db)):
    return utils.get_patient_measurements(db, patient.email)


@app.post("/add/measurement")
async def add_measurement(measurement: schema.AddMeasurement, patient: Annotated[model.Patient, Depends(get_current_patient)],
                          db: Session = Depends(get_db)):
    if measurement.patient_email != patient.email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized action")
    return utils.add_measurement(db, measurement)


@app.post("/login/doctor", response_model=schema.Token)
async def login_doctor(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    doctor = authenticate_doctor(db, form_data.username, form_data.password)
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=120)
    access_token = create_access_token(
        data={"sub": doctor.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/login/admin")
async def login_admin(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    admin = authenticate_admin(db, form_data.username, form_data.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=120)
    access_token = create_access_token(
        data={"sub": admin.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/login/patient")
async def google_login(request: Request):
    return await google_sso.get_login_url(redirect_uri=request.url_for("sso_callback"))


@app.get("/ssotoken/callback")
async def sso_callback(request: Request, db: Session = Depends(get_db)):
    """Proces login response from Google and return user info"""
    user = await google_sso.verify_and_process(request)
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not utils.patient_exists(db, user.email):
        utils.create_patient(db, user.email)

    # return {"email": user.email}
    access_token_expire = timedelta(minutes=120)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expire
    )

    # return access_token

    redirect_response = RedirectResponse("http://localhost:3000/")
    redirect_response.set_cookie(
        key="access_token", value=f"Bearer {access_token}"
    )
    return redirect_response


@app.post("/add/admin")
async def add_admin(db: Session = Depends(get_db)):
    new_admin = model.Admin(email="admin@mail.com", password_hash=get_password_hash("admin"))
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin


@app.post("/add/doctor")
async def add_doctor(db: Session = Depends(get_db)):
    new_doctor = model.Doctor(email="d1@mail.com", password_hash=get_password_hash("doctor"), first_name="Jan",
                              last_name="Kowalski")
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    return new_doctor
