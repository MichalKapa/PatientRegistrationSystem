from datetime import timedelta, datetime
from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer
from starlette import status

from app.crud import utils
from app.models import model
from app.schemas import schema
from app.database.database import engine, SessionLocal
from starlette.requests import Request
from fastapi_sso.sso.google import GoogleSSO
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from app.config import Config

import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'


model.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

import os
database_address = os.environ["DB_URL"]
frontend_address = os.environ["FRONTEND_URL"]

origins = [
    "http://localhost:8080",
    "http://localhost:8000*",
    "http://localhost:8000",
    "http://localhost:5050",
    "http://localhost:5432",
    database_address,
    frontend_address,
    "http://localhost:8000/google/login",
    "http://localhost:8000/api/v1/google/callback",
    "https://*google.com/*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


async def get_admin(token: Annotated[str, Depends(oauth2_scheme)]):
    return {}


async def get_doctor(token: Annotated[str, Depends(oauth2_scheme)]):
    return {}


@app.get("/")
async def root():
    return {"message": "The Patient Registration System is working."}


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


@app.post("/add/reservation")
async def add_reservation():
#     - addReservation(PatientId, DoctorId, DateTime)
# - /add/reservation
# - POST
# - {PatientId, DoctorId, DateTime}
# - OK
    pass

@app.delete("/delete/reservation")
async def delete_reservation(reservation_id: int):
    # lekarz, którego jest rezerwacja
# - deleteReservation(PatientId, DoctorId)
# - /delete/reservation
# - DELETE
# - {PatientId, DoctorId}
# - OK
    pass


@app.get("/get/doctors", response_model=list[schema.Doctor])
async def get_doctors(db: Session = Depends(get_db)):
    return utils.get_all_doctors(db)


@app.post("/register/doctor", response_model=schema.Doctor)
async def create_doctor(new_doctor: schema.DoctorCreate, db: Session = Depends(get_db)):
    return utils.create_doctor(db, new_doctor)


@app.put("/update/doctor", response_model=schema.Doctor)
async def update_doctor(doctor: schema.DoctorUpdate, db: Session = Depends(get_db)):
    # doctor, którego dotyczy update/ admin
    return utils.update_doctor(db, doctor)


@app.delete("/delete/doctor/{doctor_id}", response_model=schema.Doctor)
async def delete_doctor(doctor_id: int, admin: Annotated[model.Admin, Depends(get_admin)],
                        db: Session = Depends(get_db)):
    if admin is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized action")
    return utils.delete_doctor(db, doctor_id)


@app.get("/patient/measurements/{patient_id}")
async def get_patient_measurements(patient_email: str, db: Session = Depends(get_db)):
    #sprawdzanie czy lekarz który ma wizytę z pacjentem prosi o pomiary
    #sprawdzić czy pacjent prosi o swoje pomiary
    return utils.get_patient_measurements(db, patient_email)


@app.post("/add/measurement")
async def add_measurement(measurement: schema.AddMeasurement, patient: Annotated[model.Patient, Depends(get_current_patient)],
                          db: Session = Depends(get_db)):
    if measurement.patient_email != patient.email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized action")
    return utils.add_measurement(db, measurement)


@app.post("/login/doctor")
async def login_doctor():
    # - {Login, Password}
    # - return Token?
    pass


@app.post("/login/admin")
async def login_admin():
    # - {Login, Password}
    # - return Token?
    pass


@app.get("/login/patient")
async def google_login(request: Request):
    return await google_sso.get_login_redirect(redirect_uri=request.url_for("sso_callback"))


@app.get("/ssotoken/callback")
async def sso_callback(request: Request, db: Session = Depends(get_db)):
    """Proces login response from Google and return user info"""
    user = await google_sso.verify_and_process(request)
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid credentials")



    # return {"email": user.email}
    access_token_expire = timedelta(minutes=120)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expire
    )

    return access_token

    # redirect_response = RedirectResponse("http://localhost:8080/admin")
    # redirect_response.set_cookie(
    #     key="access_token", value=f"Bearer {access_token}", httponly=True
    # )
    # return redirect_response


