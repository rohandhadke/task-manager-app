from datetime import datetime
from pydantic import BaseModel, EmailStr, constr
# from os import constr
from typing import Optional, List


# ----- Task Schemas -----

class TaskBase(BaseModel):
    title: str
    description: str = ""
    status: str = "todo"      # use lowercase consistently
    priority: str = "medium"
    deadline: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True
    
class UserProfile(BaseModel):
    id: int
    username: str
    name: str | None = None
    email: EmailStr
    phone: str | None = None

    class Config:
        from_attributes = True

class UserProfileUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None

class PasswordUpdate(BaseModel):
    old_password: str
    new_password: str

# ----- User Schemas -----

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    name: Optional[str] = None
    phone: Optional[str] = None

class User(UserBase):
    id: int
    tasks: List[Task] = []

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None


# ----- Auth Schemas -----

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
