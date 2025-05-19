import base64
from datetime import date
from fastapi import APIRouter, Depends, File,Form, HTTPException, Query, UploadFile, status
import requests
from sqlalchemy.orm import Session
from typing import List, Optional

from db import models
from . import schemas, crud
from db.database import get_db

from user.auth import get_current_user


router = APIRouter()

IMGUR_CLIENT_ID = "52eaccb7a73d431"

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
    db: Session = Depends(get_db)
):
    return crud.get_history(
        db=db,
        ticket_id=ticket_id,
        ticket_type=ticket_type,
        vehicle_type=vehicle_type,
        date_from=date_from,
        date_to=date_to,
        license_plate=license_plate
    )