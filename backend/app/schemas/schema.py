from pydantic import BaseModel
from pydantic.networks import EmailStr
from datetime import datetime, date


class Patient(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class Doctor(BaseModel):
    doctor_id: int
    first_name: str
    last_name: str
    email: EmailStr
    image_source: str | None
    description: str | None

    class Config:
        orm_mode = True


class Reservation(BaseModel):
    reservation_id: int
    doctor_id: int
    patient_email: str | None
    start: datetime
    end: datetime

    class Config:
        orm_mode = True


class Timetable(BaseModel):
    pass


class Measurement(BaseModel):
    measurement_id: int
    patient_email: str
    mass: float
    temperature: float
    pressure_sys: int
    pressure_dia: int
    date: date

    class Config:
        orm_mode = True


class AddReservation(BaseModel): # reserwacje są wybierane z dostępnych, więc nie powinno to tak działać
    doctor_id: int
    start: datetime
    end: datetime


class ReserveAppointment(BaseModel): # reserwacje są wybierane z dostępnych, więc nie powinno to tak działać
    patient_email: str
    reservation_id: int


class ReleaseAppointment(BaseModel): # w takim wypadku będzie usuwanie wszystkich rezerwacji
    reservation_id: int


class DoctorCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    description: str


class DoctorUpdate(BaseModel):
    doctor_id: int
    first_name: str
    last_name: str
    email: str
    image_source: str # zmienić na plik
    description: str


class AddMeasurement(BaseModel):
    patient_email: str
    mass: float
    temperature: float
    pressure_sys: int
    pressure_dia: int
    date: date


class AdminLogin(BaseModel):
    login: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None
