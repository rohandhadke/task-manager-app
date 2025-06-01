# app/routers/user.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas, database, auth

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me", response_model=schemas.User)
def get_my_profile(current_user: models.User = Depends(auth.get_current_user)):
    return current_user
