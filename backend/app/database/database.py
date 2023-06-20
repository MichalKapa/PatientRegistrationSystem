from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os
user = os.environ["DB_USER"]
password = os.environ["DB_PASSWORD"]
address = os.environ["DB_URL"]
db = os.environ["DB_NAME"]

SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{address}/{db}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
