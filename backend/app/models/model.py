from datetime import datetime, date

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from typing import Optional, List
from sqlalchemy.orm import relationship
from ..database.database import Base


class Admin(Base):
    __tablename__ = "admin"
    email: Mapped[str] = mapped_column(primary_key=True)
    password_hash: Mapped[str]


class Patient(Base):
    __tablename__ = "patient"
    email: Mapped[str] = mapped_column(primary_key=True)
    first_name: Mapped[Optional[str]]
    last_name: Mapped[Optional[str]]

    measurements: Mapped[List["Measurement"]] = relationship()


class Doctor(Base):
    __tablename__ = "doctor"
    doctor_id: Mapped[int] = mapped_column(primary_key=True)
    password_hash: Mapped[str] = mapped_column()
    first_name: Mapped[str]
    last_name: Mapped[str]
    email: Mapped[str]
    image_source: Mapped[Optional[str]]
    description: Mapped[Optional[str]]

    appointments: Mapped[List["Reservation"]] = relationship(back_populates="doctor")


class Reservation(Base):
    __tablename__ = "reservation"
    reservation_id: Mapped[int] = mapped_column(primary_key=True)
    doctor_id: Mapped[int] = mapped_column(ForeignKey("doctor.doctor_id"))
    patient_email: Mapped[Optional[str]] = mapped_column(ForeignKey("patient.email"))
    start: Mapped[datetime]
    end: Mapped[datetime]
    in_reservating: Mapped[bool] = mapped_column(default=False)

    doctor: Mapped["Doctor"] = relationship()
    

class Timetable(Base):
    __tablename__ = "timetable"
    timetable_id: Mapped[int] = mapped_column(primary_key=True)
    pass


class Measurement(Base):
    __tablename__ = "measurement"
    measurement_id: Mapped[int] = mapped_column(primary_key=True)
    patient_email: Mapped[str] = mapped_column(ForeignKey("patient.email"))
    mass: Mapped[float]
    temperature: Mapped[float]
    pressure_sys: Mapped[int]
    pressure_dia: Mapped[int]
    date: Mapped[date]
    