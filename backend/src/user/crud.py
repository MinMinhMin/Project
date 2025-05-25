from sqlalchemy.orm import Session
from passlib.context import CryptContext
from db import models
from user.schemas import UserCreate, User, UserUpdate
from sqlalchemy import or_

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_all_users(db: Session):
    return db.query(models.User).all()

def search_users_by_pattern(db: Session, pattern: str):
    return db.query(models.User).filter(
        or_(
            models.User.username.ilike(f"%{pattern}%"),
            models.User.full_name.ilike(f"%{pattern}%"),
            models.User.phone_number.ilike(f"%{pattern}%")
        )
    ).all()

def is_admin(user: models.User):
    return user.role == "admin"

def update_user_admin(db: Session, user: models.User, user_update: UserUpdate):
    if user_update.password:
        user.hashed_password = pwd_context.hash(user_update.password)
    if user_update.username:
        user.username = user_update.username
    if user_update.full_name:
        user.full_name = user_update.full_name
    if user_update.phone_number:
        user.phone_number = user_update.phone_number
    db.commit()
    db.refresh(user)
    return user

def create_user(db: Session, user: UserCreate, role: str = "user"):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password, role=role, full_name=None, phone_number=None)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def remove_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user or not pwd_context.verify(password, user.hashed_password):
        return False
    return user