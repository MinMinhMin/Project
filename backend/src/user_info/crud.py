from sqlalchemy.orm import Session
from . import schemas
from db import models


def create_user_info(db: Session, user_info: schemas.UserInfoCreate, user_id: int):
    db_user_info = models.UserInfo( full_name=user_info.full_name,phone_number=user_info.phone_number,user_id=user_id)
    db.add(db_user_info)
    db.commit()
    db.refresh(db_user_info)
    return db_user_info


def get_user_info(db: Session, user_id: int):
    db_user_info = db.query(models.UserInfo).filter(models.UserInfo.user_id == user_id).first()
    return db_user_info