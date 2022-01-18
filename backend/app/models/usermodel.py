from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
import enum

from sqlalchemy.sql.sqltypes import DateTime, Float 

from app.database import Base, BaseModel


class User(BaseModel):
    __tablename__ = "users"   
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    team_name = Column(String, default="superusers")
    is_superuser = Column(Boolean, default=False)
    data_insights_file = Column(String, nullable=True)
    data_insights_link = Column(String, nullable=True)
    submissions = relationship("Submission", back_populates="user")
    leaderboard = relationship("LeaderBoard", back_populates="user", uselist=False)

    # roles = relationship("Role", secondary=UserRole, backref="User")




class Submission(BaseModel):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="submissions")
    score = Column(Float, index=True)
    file = Column(String, nullable=True)
    
class LeaderBoard(BaseModel):
    __tablename__ = "leaderboard"

    id = Column(Integer, primary_key=True, index=True)
    public = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="leaderboard")
    team_name = Column(String, default="organizers")
    highest_score = Column(Float, index=True)
    entries = Column(Integer)
    last = Column(DateTime)


class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    announced = Column(Boolean, default=False)