import random
import fastapi
from sqlalchemy.orm import Session
from sqlalchemy import inspect

from .crud import usercrud
from .models import  usermodel
from .schemas import userschema
from app.core.config import settings

def init_db(db):
    user_in = userschema.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD
        )
    try:
        print("creating superuser")
        _ = usercrud.create_user(db, user=user_in, is_superuser=True)

    except Exception as E:
        print(E)
   

def seed_db(db: Session):
    pass
