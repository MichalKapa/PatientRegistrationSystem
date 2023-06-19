from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os
user = os.environ["POSTGRES_USER"]
password = os.environ["POSTGRES_PASSWORD"]
address = os.environ["POSTGRES_ADDRESS"]
db = os.environ["POSTGRES_DB"]

# SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{address}/{db}"

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/registration_system"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
