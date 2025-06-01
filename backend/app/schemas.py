from pydantic import BaseModel, EmailStr
from typing import Optional, List

# ----- Task Schemas -----

class TaskBase(BaseModel):
    title: str
    description: str
    status: Optional[str] = "todo"

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    owner_id: Optional[int] = None

class Task(TaskBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True  # Updated for Pydantic v2


# ----- User Schemas -----

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    tasks: List[Task] = []

    class Config:
        from_attributes = True  # Updated for Pydantic v2


# ----- Auth Schemas -----

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
