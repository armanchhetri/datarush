from http.client import HTTPException
from app.database import SessionLocal
from app.models.usermodel import User
from app.core.security import get_password_hash
from app.crud.usercrud import create_user
from app.schemas.userschema import UserCreate
import pandas as pd
import csv

import hashlib

from app.core.config import settings 
db = SessionLocal()

def get_users(path):
    updated_users = ["username,team_name,password"]
    users_df = pd.read_csv(path)
    for index, row in users_df.iterrows():
        password = str(index) + row["email"] + row["team_name"] + settings.SECRET_KEY
        h = hashlib.new('sha256')
        h.update(password.encode('utf-8'))
        password = h.hexdigest()
        # password = get_password_hash(password)
        password = password[10:20]
        # print(password)
        user = UserCreate(email=row["email"], team_name=row["team_name"], password=password)

        
        user = create_user(db=db, user=user)
        
        print(row["email"], row["team_name"], password)
        u_csv = ','.join([row["email"], row["team_name"], password])
        updated_users.append(u_csv)
    
        
    return '\n'.join(updated_users)
    # print(users)

if __name__ =="__main__":
    u_users = get_users("register/users.csv")
    with open("register/updated_users.csv", "w") as f:
        f.write(u_users)

    db.close()