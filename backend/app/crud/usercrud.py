from typing import List
from fastapi import HTTPException
from fastapi.datastructures import UploadFile
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from fastapi import Depends, status
from datetime import timedelta, datetime
from fastapi.security.oauth2 import OAuth2PasswordRequestForm


from app.core.security import get_password_hash, get_token_data, verify_password
from app.core.config import settings
from app.models import usermodel
from app.schemas import userschema
from app.database import get_db
from app.utils import save_db, save_file

from .evaluation import calculate_score


def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(usermodel.User).filter(
        usermodel.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User Does not exist")
    return db_user


def get_user_by_id(db: Session, user_id: int):
    db_user = db.query(usermodel.User).filter(
        usermodel.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User Does not exist")

    return db_user


def get_user_by_email(db, email: str):
    return db.query(usermodel.User).filter(usermodel.User.email == email).first()


def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(usermodel.User).offset(skip).limit(limit).all()


def get_current_user(db: Session = Depends(get_db), token_data: userschema.TokenData = Depends(get_token_data)):
    user = get_user_by_email(db, email=token_data.email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


def get_current_active_user(current_user: userschema.User = Depends(get_current_user)):
    if current_user.is_active:
        return current_user
    raise HTTPException(status_code=400, detail="Inactive user")


def authenticate_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.username)
    if not user:
        return False
    if not verify_password(form_data.password, user.hashed_password):
        return False
    return user


def create_user(db, user: userschema.UserCreate, is_superuser=False):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    user = user.dict()
    del user["password"]
    user.update({"hashed_password": hashed_password})
    try:
        db_user = usermodel.User(**user, is_superuser=is_superuser)
        db.add(db_user)
        db.commit()
    except:
        db.rollback()
    else:
        db.refresh(db_user)
    return db_user


def update_user(db: Session, user: userschema.UserUpdate):
    db_user = get_user_by_email(db, email=user.email)

    if user.password:
        hashed_password = get_password_hash(user.password)
        db_user.hashed_password = hashed_password

    if user.role:
        db_user.role = user.role
    if user.is_active != None:
        db_user.is_active = user.is_active
    db.commit()
    db.refresh(db_user)

    return db_user


def delete_user(db: Session, user_id: int):
    db_user = get_user_by_id(db, user_id)
    if db_user.is_superuser:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    db.delete(db_user)
    db.commit()
    return db_user


def get_submissions(db: Session, user_id: int):
    return db.query(usermodel.Submission).filter(usermodel.Submission.user_id == user_id).all()

def get_leaderboard(db: Session, user_id: int):
    lb_pri = db.query(usermodel.LeaderBoard).filter(usermodel.LeaderBoard.user_id == user_id and
                                                usermodel.LeaderBoard.public == False).first()

    lb_pub = db.query(usermodel.LeaderBoard).filter(usermodel.LeaderBoard.user_id == user_id and
                                                usermodel.LeaderBoard.public == True).first()

    return lb_pri, lb_pub


# For submissions
def submit_solution(db: Session, user: userschema.User, csv_file: UploadFile):
    if csv_file.filename != "solution.csv":
        raise HTTPException(
            status_code=400, detail="File must be named 'solution.csv'")

    def sub_file_name(filename: str):
        time = datetime.now().strftime("%Y%m%d%H%M%S")
        return f"{user.team_name}_{time}_{filename}"

    file_path = save_file(csv_file, settings.SUBMISSION_DIR, sub_file_name)

    pub_score, pri_score = calculate_score(file_path)

    submission = usermodel.Submission(user_id=user.id, score=pub_score)
    submission = save_db(db, submission)

    pri_leaderboard, pub_leaderboard = get_leaderboard(db, user.id)

    if pub_leaderboard is None:
        leaderboard = usermodel.LeaderBoard(team_name = user.team_name,
            user_id=user.id, highest_score=pub_score, entries=1, last=submission.timestamp, public=True)
        leaderboard = save_db(db, leaderboard)

    else:
        if pub_leaderboard.highest_score <  pub_score:
            pub_leaderboard.highest_score = pub_score
            pub_leaderboard.last = submission.timestamp

        pub_leaderboard.entries = pub_leaderboard.entries + 1
        leaderboard = save_db(db, pub_leaderboard)

    if pri_leaderboard is None:
        leaderboard = usermodel.LeaderBoard(team_name = user.team_name,
            user_id=user.id, highest_score=pri_score, entries=1, last=submission.timestamp, public=False)
        leaderboard = save_db(db, leaderboard)

    else:
        if pri_leaderboard.highest_score <  pri_score:
            pri_leaderboard.highest_score = pri_score
            pri_leaderboard.last = submission.timestamp
        pri_leaderboard.entries = pri_leaderboard.entries + 1
        leaderboard = save_db(db, pri_leaderboard)

    return pub_score


def get_public_leaderboard(db:Session) -> List[userschema.LeaderBoard]:
    return db.query(usermodel.LeaderBoard).filter(usermodel.LeaderBoard.public == True).order_by(usermodel.LeaderBoard.highest_score.desc()).all()

def get_private_leaderboard(db:Session) -> List[userschema.LeaderBoard]:
    return db.query(usermodel.LeaderBoard).filter(usermodel.LeaderBoard.public == False).order_by(usermodel.LeaderBoard.highest_score.desc()).all()