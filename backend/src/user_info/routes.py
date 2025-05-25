from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from user.auth import get_current_user

from db.database import get_db
from . import schemas, crud

router = APIRouter()


@router.post("/create", response_model=schemas.UserInfo)
def create_user_info(user_info: schemas.UserInfoCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return crud.create_user_info(db=db, user_info=user_info, user_id=current_user.id)


@router.get("get/", response_model=schemas.UserInfo)
def get_user_info(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    user_info = crud.get_user_info(db=db, user_id=current_user.id)
    if not user_info:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User info not found")
    return user_info

