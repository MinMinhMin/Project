from datetime import date
import json
from typing import List, Optional
from sqlalchemy.orm import Session
from . import schemas
from db import models

def create_history(db: Session, history: schemas.HistoryCreate, user_id: int):
    db_history = models.History(
        face_image_path_IN=history.face_image_path_IN,
        license_plate_image_path_IN=history.license_plate_image_path_IN,
        face_embedding_IN=json.dumps(history.face_embedding_IN),
        license_plate_IN=history.license_plate_IN,
        face_image_path_OUT=history.face_image_path_OUT,
        license_plate_image_path_OUT=history.license_plate_image_path_OUT,
        face_embedding_OUT=json.dumps(history.face_embedding_OUT),
        license_plate_OUT=history.license_plate_OUT,
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
    db_history.face_embedding_IN = json.loads(db_history.face_embedding_IN)
    db_history.face_embedding_OUT = json.loads(db_history.face_embedding_OUT)

    return db_history

def get_history(
    db: Session,
    ticket_id: Optional[str] = None,
    ticket_type: Optional[str] = None,
    vehicle_type: Optional[str] = None,
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    license_plate: Optional[str] = None,
    parking_lot_id: Optional[int] = None,
    user_id: Optional[int] = None,
) -> List[models.History]:
    query = db.query(models.History)

    def is_valid(s):
        return s is not None and s.strip().lower() != "null" and s.strip() != ""
    if user_id:
        query = query.filter(models.History.user_id == user_id)
    if is_valid(ticket_id):
        query = query.filter(models.History.ticket_id == ticket_id)
    if is_valid(ticket_type):
        query = query.filter(models.History.ticket_type == ticket_type)
    if is_valid(vehicle_type):
        query = query.filter(models.History.vehicle_type == vehicle_type)
    if date_from:
        query = query.filter(models.History.date_in >= date_from)
    if date_to:
        query = query.filter(models.History.date_in <= date_to)
    if is_valid(license_plate):
        query = query.filter(models.History.license_plate_IN.ilike(f"%{license_plate}%"))
    if parking_lot_id:
        query = query.filter(models.History.parking_lot_id == parking_lot_id)

    histories = query.all()
    for history in histories:
        history.face_embedding_IN = json.loads(history.face_embedding_IN)
        history.face_embedding_OUT = json.loads(history.face_embedding_OUT)
    print("ticket_id =", ticket_id)
    print("ticket_type =", ticket_type)
    print("vehicle_type =", vehicle_type)
    print("date_from =", date_from)
    print("date_to =", date_to)
    print("license_plate =", license_plate)
    print("Total records fetched:", len(histories))
    return histories




def update_history(db: Session, history_id: int, updates: schemas.HistoryUpdate,user_id:int) -> Optional[models.History]:
    history = db.query(models.History).filter(models.History.user_id==user_id).filter(models.History.id == history_id).first()
    if not history:
        return None

    update_data = updates.dict(exclude_unset=True)

    for key, value in update_data.items():
        if key in ["face_embedding_IN", "face_embedding_OUT"] and isinstance(value, list):
            value = json.dumps(value)
        setattr(history, key, value)

    db.commit()
    db.refresh(history)
    return history