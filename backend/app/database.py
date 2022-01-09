from fastapi.param_functions import Depends
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import DateTime, Column, Integer

from datetime import datetime
from sqlalchemy.orm.session import Session
from app.core.config import settings
from app.core.time import now

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"
if settings.DEBUG == False:
    SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.DATABASE_USERNAME}:{settings.DATABASE_PASSWORD}@{settings.DATABASE_HOSTNAME}:{settings.DATABASE_PORT}/{settings.DATABASE_NAME}'

print(settings.DATABASE_HOSTNAME)
try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    print("Connecting")

except Exception as e:
    print("[exception]", e)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True, autoincrement=True)
    timestamp = Column(DateTime, default=now)



# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
