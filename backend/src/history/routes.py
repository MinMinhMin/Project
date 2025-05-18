import base64
from fastapi import APIRouter, Depends, File,Form, HTTPException, UploadFile, status
import requests
from sqlalchemy.orm import Session
from typing import List

from db import models
from . import schemas, crud
from db.database import get_db

from user.auth import get_current_user


router = APIRouter()

IMGUR_CLIENT_ID = "52eaccb7a73d431"


@router.post("/upload_images/", response_model=schemas.History)
# async def upload_image(
#     parking_lot_id: int = Form(),
#     face_image: UploadFile = File(...),
#     plate_image: UploadFile = File(...),
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_user)
# ):
#     face_image_content = face_image.file.read()
#     plate_image_content = plate_image.file.read()
#     base64_face_img = base64.b64encode(face_image_content).decode("utf-8")
#     base64_plate_img = base64.b64encode(plate_image_content).decode("utf-8")

#     face_recognizer = FaceRecognizer(model_name="Facenet", enforce_detection=True)
#     plate_recognizer = PlateRecognizer()

#     try:
#         face_img = face_recognizer.load_image(base64_face_img)
#         embedding = face_recognizer.get_embedding(face_img)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Face recognition error: {e}")

#     try:
#         plate_img = plate_recognizer.load_image(base64_plate_img)
#         license_plate = plate_recognizer.detect_plate(plate_img)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Plate recognition error: {e}")

#     face_image_response = requests.post(
#         url="https://api.imgur.com/3/image",
#         headers={"Authorization": f"Client-ID {IMGUR_CLIENT_ID}"},
#         files={"image": face_image_content}
#     )

#     if face_image_response.status_code != 200:
#         raise HTTPException(status_code=500, detail="Face Image upload failed")
#     face_image_url = face_image_response.json()["data"]["link"]

#     plate_image_response = requests.post(
#         url="https://api.imgur.com/3/image",
#         headers={"Authorization": f"Client-ID {IMGUR_CLIENT_ID}"},
#         files={"image": plate_image_content}
#     )

#     if plate_image_response.status_code != 200:
#         raise HTTPException(status_code=500, detail="Plate Image upload failed")
#     plate_image_url = plate_image_response.json()["data"]["link"]


#     history_create = schemas.HistoryCreate(
#         face_image_path=face_image_url,  # as per your request
#         license_plate_image_path=plate_image_url,  # as per your request
#         face_embedding=embedding.tolist(),  # Convert numpy array to list
#         license_plate=license_plate,
#         parking_lot_id=parking_lot_id
#     )

#     return crud.create_history(db, history_create, user_id=current_user.id)

@router.get("/list", response_model=List[schemas.History])
def read_history(parking_lot_id: int, db: Session = Depends(get_db)):
    history = crud.get_history_by_parking_lot(db=db, parking_lot_id=parking_lot_id)
    if not history:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="History not found")
    return history