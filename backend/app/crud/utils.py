from datetime import datetime, timedelta

from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException
from fastapi import status
from ..models import model
from ..schemas import schema
from ..auth.auth import get_password_hash

def create_patient(db: Session, email: str):
    db_patient = db.query(model.Patient).filter(model.Patient.email == email).first()
    if db_patient is not None:
        return HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Patient already exists.")
    patient = model.Patient(email=email)
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


def patient_exists(db: Session, email: str):
    return db.query(model.Patient).filter(model.Patient.email == email).first() is not None


def get_doctor(db: Session, doctor_id: int):
    return db.query(model.Doctor).filter(model.Doctor.doctor_id == doctor_id).first()


def doctor_reservations(db: Session, doctor_id: int):
    return db.query(model.Reservation).filter(model.Reservation.doctor_id == doctor_id).all()


def patient_reservations(db: Session, patient_email: str):
    return db.query(model.Reservation).filter(model.Reservation.patient_email == patient_email).all()


def get_all_doctors(db: Session):
    return db.query(model.Doctor).all()


def get_patient(db: Session, email: str):
    return db.query(model.Patient).filter(model.Patient.email == email).first()


def get_patient_measurements(db: Session, patient_email: str):
    return db.query(model.Patient).filter(model.Patient.patient_email == patient_email).all()


def add_measurement(db: Session, measurement: schema.AddMeasurement):
    patient = db.query(model.Patient).filter(model.Patient.email == measurement.patient_email).first()
    if patient is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient does not exist.")
    new_measurement = model.Measurement(**measurement.dict())
    db.add(new_measurement)
    db.commit()
    db.refresh(new_measurement)
    return new_measurement


def add_appointment(db: Session, appointment: schema.AddReservation):
    new_appointment = model.Reservation(**appointment.dict())
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment


def create_and_reserve_appointment(db: Session, patient_email: str, doctor_id: int, time: datetime):
    reserved_appointment = {"doctor_id": doctor_id, "patient_email": patient_email, "start": time,
                            "end": time+timedelta(minutes=30)}
    new_appointment = model.Reservation(**reserved_appointment)
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment


def reserve_appointment(db: Session, patient_email: str, appointment_id: int):
    appointment = db.query(model.Reservation).filter(model.Reservation.reservation_id == appointment_id).first()
    patient = db.query(model.Patient).filter(model.Patient.email == patient_email).first()
    if appointment is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid reservation id")
    if patient is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
    if appointment.patient_email is not None:
        return HTTPException(status_code=status.HTTP_409_CONFLICT, detail="This appointment is already reserved.")
    appointment.patient_email = patient_email
    db.commit()
    db.refresh(appointment)
    return appointment


def release_appointment(db: Session, appointment_id: int):
    appointment = db.query(model.Reservation).filter(model.Reservation.reservation_id == appointment_id).first()
    if appointment is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid reservation id")
    appointment.patient_email = None
    db.commit()
    db.refresh(appointment)
    return appointment


def delete_appointment(db: Session, appointment_id: int):
    appointment = db.query(model.Reservation).filter(model.Reservation.reservation_id == appointment_id).first()
    if appointment is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid reservation id")
    db.delete(appointment)
    db.commit()
    return True


def get_appointment_doctor(db: Session, appointment_id: int):
    appointment = db.query(model.Reservation).filter(model.Reservation.reservation_id == appointment_id).first()
    if appointment is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid reservation id")
    return appointment.doctor.email


def get_appointment_patient(db: Session, appointment_id: int):
    appointment = db.query(model.Reservation).filter(model.Reservation.reservation_id == appointment_id).first()
    if appointment is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid reservation id")
    return appointment.patient_email


def create_doctor(db: Session, doctor: schema.DoctorCreate):
    if db.query(model.Doctor).filter(model.Doctor.email == doctor.email).first():
        return HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email is occupied.")
    password_plain = doctor.dict().pop("password")
    doctor.dict()["password_hash"] = get_password_hash(password_plain)
    new_doctor = model.Doctor(**doctor.dict())
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    return new_doctor


def update_doctor(db: Session, doctor: schema.DoctorUpdate):
    db_doctor = db.query(model.Doctor).filter(model.Doctor.doctor_id == doctor.doctor_id).first()
    if db_doctor is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is not a doctor with specified id")
    db_doctor.update(**doctor.dict())
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


def delete_doctor(db: Session, doctor_id: int):
    doctor = db.query(model.Doctor).filter(model.Doctor.doctor_id == doctor_id).first()
    if doctor is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="There is not a doctor with specified id")
    db.delete(doctor)
    db.commit()
    return HTTPException(status_code=status.HTTP_200_OK, detail=f"Doctor({doctor_id}) deleted")


def get_doctor_login(db: Session, email: str):
    return db.query(model.Doctor).filter(model.Doctor.email == email).first()


def get_admin_login(db: Session, email: str):
    return db.query(model.Admin).filter(model.Admin.email == email).first()


def set_doctor_profile_photo_url(db: Session, doctor_id: int, url: str):
    doc = db.query(model.Doctor).filter(model.Doctor.doctor_id == doctor_id)
    doc.image_source = url
    db.commit()
    db.refresh(doc)
    return doc
