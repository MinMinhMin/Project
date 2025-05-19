from datetime import date
import json
from typing import List, Optional
from sqlalchemy.orm import Session
from . import schemas
from db import models

def create_history(db: Session, history: schemas.HistoryCreate, user_id: int):
    db_history = models.History(
        face_image_path=history.face_image_path,
        license_plate_image_path=history.license_plate_image_path,
        face_embedding=json.dumps(history.face_embedding),
        license_plate=history.license_plate,
        date_in=history.date_in,
        date_out=history.date_out,
        time_in=history.time_in,
        time_out=history.time_out,
        ticket_id=history.ticket_id,
        ticket_type=history.ticket_type,
        vehicle_type=history.vehicle_type,

        parking_lot_id=history.parking_lot_id,
        user_id=user_id
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)

    # Convert JSON string back to list for response
    db_history.face_embedding = json.loads(db_history.face_embedding)

    return db_history

def get_history(
    db: Session,
    ticket_id: Optional[str] = None,
    ticket_type: Optional[str] = None,
    vehicle_type: Optional[str] = None,
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    license_plate: Optional[str] = None
) -> List[models.History]:
    query = db.query(models.History)

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
        query = query.filter(models.History.license_plate.ilike(f"%{license_plate}%"))

    histories = query.all()
    for history in histories:
        history.face_embedding = json.loads(history.face_embedding)
    return histories
