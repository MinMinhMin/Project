from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from . import schemas, crud
from db.database import get_db
from user.auth import get_current_user  # Assuming you have this implemented
from user.schemas import User as UserSchema
from typing import List
import requests


router = APIRouter()

@router.post("/add", response_model=schemas.FaceImage)
def create_image(image: schemas.FaceImageBase,
                 db: Session = Depends(get_db),
                 current_user: UserSchema = Depends(get_current_user)):
    return crud.create_face_image(db, image, current_user.id)

@router.get("/list", response_model=List[schemas.FaceImage])
def read_user_images(db: Session = Depends(get_db),
                     current_user: UserSchema = Depends(get_current_user)):
    return crud.get_face_images_by_user(db, current_user.id)

@router.delete("/delete/{image_id}", response_model=schemas.FaceImage)
def delete_image(image_id: int,
                 db: Session = Depends(get_db),
                 current_user: UserSchema = Depends(get_current_user)):
    image = crud.get_face_image_by_id(db, image_id)
    if not image or image.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this image")
    return crud.delete_face_image(db, image_id)


IMGUR_CLIENT_ID = "52eaccb7a73d431"


@router.post("/upload", response_model=schemas.FaceImage)
async def upload_image_to_imgur(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: UserSchema = Depends(get_current_user)
):
    contents = await file.read()

    # Upload to Imgur
    response = requests.post(
        url="https://api.imgur.com/3/image",
        headers={"Authorization": f"Client-ID {IMGUR_CLIENT_ID}"},
        files={"image": contents}
    )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Imgur upload failed")

    image_url = response.json()["data"]["link"]

    # Save image_url to DB
    image_data = schemas.FaceImageBase(image_url=image_url)
    return crud.create_face_image(db, image_data, current_user.id)