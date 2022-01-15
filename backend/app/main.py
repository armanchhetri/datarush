from typing import List, Optional, Tuple
from datetime import datetime, timedelta


from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from fastapi import Depends, FastAPI, HTTPException, status, File, UploadFile, Request
from fastapi.param_functions import Form
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.security import create_access_token
from fastapi.staticfiles import StaticFiles

from app.utils import save_db, secure_filename, MyUploadFile


from .crud import usercrud
from .models import usermodel
from .schemas import userschema
from app.core.config import settings
from .crud.usercrud import get_current_user, is_superuser, save_data_insights, submit_solution
from .database import SessionLocal, engine, get_db, Base

from .dbinit import init_db, seed_db


Base.metadata.create_all(bind=engine)


app = FastAPI(description=settings.DESCRIPTION, root_path=settings.ROOT_PATH)
# app = FastAPI(description=settings.DESCRIPTION)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    init_db(db)
    # seed_db(db)
    db.close()


@app.post("/token", response_model=userschema.Token)
async def login_for_access_token(user: Optional[userschema.User] = Depends(usercrud.authenticate_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password or unauthorized",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/users/", response_model=userschema.User, dependencies=[Depends(is_superuser)])
def create_user(user: userschema.UserCreate, db: Session = Depends(get_db)):
    db_user = usercrud.create_user(db=db, user=user)
    return db_user


@app.put("/users/admin/update-user", response_model=userschema.User, dependencies=[Depends(is_superuser)])
def update_user(user: userschema.UserUpdate, db: Session = Depends(get_db)):
    db_user = usercrud.update_user(db=db, user=user)
    return db_user


@app.delete("/users/admin/update-user/{user_id}", response_model=userschema.User, dependencies=[Depends(is_superuser)])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = usercrud.delete_user(db=db, user_id=user_id)
    return db_user


# @app.get("/users/", response_model=List[userschema.User], dependencies=[Depends(get_current_user)])
@app.get("/users/", response_model=List[userschema.User], dependencies=[Depends(is_superuser)])
def read_users(users: userschema.User = Depends(usercrud.get_users)):
    return users


@app.get("/users/me", response_model=userschema.User)
def read_user_me(current_user: userschema.User = Depends(usercrud.get_current_user)):
    return current_user


@app.put("/users/me/update", response_model=userschema.User, dependencies=[Depends(is_superuser)])
def update_user_me(new_user: userschema.UserUpdate, curr_user=Depends(usercrud.get_current_user), db=Depends(get_db)):
    if new_user.email == curr_user.email:
        new_user = userschema.UserCreate(**new_user.dict())
        db_user = usercrud.update_user(db=db, user=new_user)
        return db_user
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Unauthorized: Please insert your own username or login with admin credentials")


@app.get("/users/{user_id}", response_model=userschema.User, dependencies=[Depends(usercrud.get_current_user)])
def read_user(db_user: userschema.User = Depends(usercrud.get_user)):
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/submit")
def submit_sol(file: UploadFile = File(...), user: usermodel.User = Depends(usercrud.get_current_user),
               db: Session = Depends(get_db)):
    score = submit_solution(db, user, file)
    return {"score": score}


@app.post("/submit-insights")
def submit_data_insights(file: MyUploadFile = File(None), link:str = Form(None), user: usermodel.User = Depends(usercrud.get_current_user),
               db: Session = Depends(get_db)):

    if file is None and link is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please provide either a file or a link")

    save_data_insights(db, user, file, link)
    return {"msg": "Done"}



@app.get("/mysubmissions", response_model=List[userschema.Submission])
def submissions(db: Session = Depends(get_db), user: usermodel.User = Depends(usercrud.get_current_user)):
    submissions = usercrud.get_submissions(db, user.id)
    return submissions

@app.get("/public-leaderboard", response_model = List[userschema.LeaderBoard])
def public_leaderboard(db: Session = Depends(get_db)):
    leaderboard = usercrud.get_public_leaderboard(db)
    return leaderboard

@app.get("/private-leaderboard", response_model = List[userschema.LeaderBoard])
def private_leaderboard(db: Session = Depends(get_db)):
    announced = db.query(usermodel.Announcement).first()
    if announced is None:
        announced = usermodel.Announcement()
        announced = save_db(db, announced)
    if announced.announced == False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Private Leaderboard Announcement not yet made")

    leaderboard = usercrud.get_private_leaderboard(db)
    return leaderboard

@app.post("/announce_private")
def announce_private(announce: bool = Form(False), db: Session = Depends(get_db), user:usermodel.User =  Depends(usercrud.get_current_user)):
    if not user.is_superuser:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Unauthorized: Only Superuser can make announcement")

    announcement = db.query(usermodel.Announcement).first()
    if announcement is None:
        announcement = usermodel.Announcement()
    announcement.announced = announce
    announcement = save_db(db, announcement)
    if announcement.announced == True:
        return {"message": "Private Leaderboard Opened"}

    else:
        return {"message": "Private Leaderboard Closed"}

