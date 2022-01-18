from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr

import json 


class Submission(BaseModel):
    id: int
    score: float
    timestamp: datetime 
    class Config:
        orm_mode = True





class UserBase(BaseModel):
    email: EmailStr
    team_name: str = "superusers"

class UserCreate(UserBase):
    password: str
    

class User(UserBase):
    id: int
    submissions: List[Submission]
    data_insights_link: Optional[str] = None
    data_insights_file: Optional[str] = None
   
    class Config:
        orm_mode = True

class SubmissionAdmin(BaseModel):
    id: int
    score: float
    timestamp: datetime
    file: str
    class Config:
        orm_mode = True

class UserAdmin(UserBase):
    id: int
    submissions: List[SubmissionAdmin]
    data_insights_link: Optional[str] = None
    data_insights_file: Optional[str] = None
   
    class Config:
        orm_mode = True


class LeaderBoard(BaseModel):
    id: int
    team_name: str 
    highest_score: float
    entries: int
    last: datetime
    class Config:
        orm_mode = True


class UserUpdate(UserBase):
    password: Optional[str]  = None

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[EmailStr] = None



