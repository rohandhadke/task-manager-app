from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy import DateTime
import pytz
IST = pytz.timezone('Asia/Kolkata')
def get_ist_time():
    return datetime.now(IST)


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    name = Column(String)  # New field
    email = Column(String, unique=True, index=True)
    phone = Column(String, nullable=True)  # New field
    hashed_password = Column(String)
    
    tasks = relationship("Task", back_populates="owner")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    status = Column(String, default="todo")  # e.g., todo, in progress, completed
    priority = Column(String, default="medium")  # e.g., urgent, high, medium, low
    deadline = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=get_ist_time)  # Use IST time
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="tasks")
