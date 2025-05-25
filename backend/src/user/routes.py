from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from db.database import SessionLocal
from user import crud, schemas, auth
from db import models

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/get", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if not crud.is_admin(current_user):
        raise HTTPException(status_code=403, detail="Only admins can view users")
    return crud.get_all_users(db)

@router.get("/search", response_model=list[schemas.User])
def search_users(pattern: str, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if not crud.is_admin(current_user):
        raise HTTPException(status_code=403, detail="Only admins can view users")
    return crud.search_users_by_pattern(db, pattern)

@router.post("/create", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if not crud.is_admin(current_user):
        raise HTTPException(status_code=403, detail="Only admins can create users")
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    return crud.create_user(db, user)

@router.put("/update/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if not crud.is_admin(current_user):
        raise HTTPException(status_code=403, detail="Only admins can update users")
    user = crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user_admin(db, user, user_update)

@router.delete("/delete/{user_id}", response_model=schemas.UserUpdate)
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if not crud.is_admin(current_user):
        raise HTTPException(status_code=403, detail="Only admins can delete users")
    db_user = crud.remove_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = auth.create_access_token({"sub": user.username, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}