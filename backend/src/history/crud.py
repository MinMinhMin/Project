import json
from sqlalchemy.orm import Session
from . import schemas
from db import models

def create_history(db: Session, history: schemas.HistoryCreate, user_id: int):
    db_history = models.History(
        face_image_path=history.face_image_path,
        license_plate_image_path=history.license_plate_image_path,
        face_embedding=json.dumps(history.face_embedding),
        license_plate=history.license_plate,
        parking_lot_id=history.parking_lot_id,
        user_id=user_id
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)

    # Convert JSON string back to list for response
    db_history.face_embedding = json.loads(db_history.face_embedding)

    return db_history

def get_history_by_parking_lot(db: Session, parking_lot_id: int):
    histories= db.query(models.History).filter(models.History.parking_lot_id == parking_lot_id).all()
    for history in histories:
        history.face_embedding = json.loads(history.face_embedding)
    return histories

