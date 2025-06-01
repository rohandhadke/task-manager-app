# app/routers/task.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas, database, auth

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.post("/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    new_task = models.Task(
        title=task.title,
        description=task.description,
        status=task.status,
        owner_id=current_user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.get("/", response_model=List[schemas.Task])
def get_all_tasks(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Task).filter(
        (models.Task.owner_id == current_user.id) |
        (models.Task.owner_id == current_user.id)
    ).all()

@router.put("/{task_id}", response_model=schemas.Task)
def update_task_status(task_id: int, updated_task: schemas.TaskUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.owner_id  != current_user.id and task.task.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    task.status = updated_task.status
    db.commit()
    db.refresh(task)
    return task
