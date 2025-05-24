import base64
from datetime import date
import json
from fastapi import APIRouter, Depends, File,Form, HTTPException, Path, Query, UploadFile, status
import requests
from pydantic import BaseModel
import requests
from sqlalchemy.orm import Session
from typing import List, Optional

from db import models
from . import schemas, crud
from db.database import get_db

from user.auth import get_current_user


router = APIRouter()


@router.post("/create", response_model=schemas.History)
def create_history(
    history: schemas.HistoryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_history(db=db, history=history, user_id=current_user.id)

@router.get("/search",response_model=List[schemas.History])
def search_history(
    ticket_id: Optional[str] = Query(None),
    ticket_type: Optional[str] = Query(None),
    vehicle_type: Optional[str] = Query(None),
    date_from: Optional[date] = Query(None),
    date_to: Optional[date] = Query(None),
    license_plate: Optional[str] = Query(None),
    parking_lot_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return crud.get_history(
        db=db,
        ticket_id=ticket_id,
        ticket_type=ticket_type,
        vehicle_type=vehicle_type,
        date_from=date_from,
        date_to=date_to,
        license_plate=license_plate,
        parking_lot_id=parking_lot_id,
        user_id=current_user.id
    )


@router.get("/search/last", response_model=Optional[schemas.History])
def get_last_history_record(
    ticket_id: Optional[str] = Query(None),
    ticket_type: Optional[str] = Query(None),
    vehicle_type: Optional[str] = Query(None),
    date_from: Optional[date] = Query(None),
    date_to: Optional[date] = Query(None),
    license_plate: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)

):
    query = db.query(models.History)

    if current_user.id:
        query = query.filter(models.History.user_id == current_user.id)
    if ticket_id:
        query = query.filter(models.History.ticket_id == ticket_id)
    if ticket_type:
        query = query.filter(models.History.ticket_type == ticket_type)
    if vehicle_type:
        query = query.filter(models.History.vehicle_type == vehicle_type)
    if date_from:
        query = query.filter(models.History.date_in >= date_from)
    if date_to:
        query = query.filter(models.History.date_in <= date_to)
    if license_plate:
        query = query.filter(models.History.license_plate_IN.ilike(f"%{license_plate}%"))

    # Order by date_in descending to get the latest one
    last_record = query.order_by(models.History.date_in.desc()).first()

    if last_record:
        # Parse JSON fields if necessary
        if last_record.face_embedding_IN:
            last_record.face_embedding_IN = json.loads(last_record.face_embedding_IN)
        if last_record.face_embedding_OUT:
            last_record.face_embedding_OUT = json.loads(last_record.face_embedding_OUT)

    return last_record


@router.put("/update/{history_id}", response_model=schemas.History)
def update_history_record(
    history_id: int = Path(..., description="The ID of the history record to update"),
    updates: schemas.HistoryUpdate = ...,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Convert lists to JSON strings before saving
    if updates.face_embedding_IN is not None:
        updates.face_embedding_IN = json.dumps(updates.face_embedding_IN)
    if updates.face_embedding_OUT is not None:
        updates.face_embedding_OUT = json.dumps(updates.face_embedding_OUT)

    updated_history = crud.update_history(db=db, history_id=history_id, updates=updates, user_id=current_user.id)

    if not updated_history:
        raise HTTPException(status_code=404, detail="History record not found.")

    # Convert back JSON strings to lists before returning
    if updated_history.face_embedding_IN:
        updated_history.face_embedding_IN = json.loads(updated_history.face_embedding_IN)
    if updated_history.face_embedding_OUT:
        updated_history.face_embedding_OUT = json.loads(updated_history.face_embedding_OUT)

    return updated_history
import logging

IMGBB_API_KEY = "4bb819ea5a73a6d7a5a4d146e2dc635d"


class ImageUploadRequest(BaseModel):
    image: str  # Base64-encoded image (no data:image/jpeg;base64,... prefix)

@router.post("/upload_to_imgbb")
async def upload_to_imgbb(payload: ImageUploadRequest):
    logging.info(f"Received image payload length: {len(payload.image)}")

    try:
        response = requests.post(
            url=f"https://api.imgbb.com/1/upload?key={IMGBB_API_KEY}",
            data={"image": payload.image}
        )
        logging.info(f"ImgBB response status: {response.status_code}")
        logging.info(f"ImgBB response content: {response.text}")
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f"ImgBB upload failed: {response.text}")

        return {"link": response.json()["data"]["url"]}
    except Exception as e:
        logging.error(f"Exception during ImgBB upload: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")