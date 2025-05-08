from sqlalchemy.orm import Session
from . import schemas
from db import models


def create_parking_lot(db: Session, parking_lot: schemas.ParkingLotCreate, user_id: int):
    db_parking_lot = models.ParkingLot(name = parking_lot.name,location = parking_lot.location,available_spots = parking_lot.available_spots, user_id=user_id)
    db.add(db_parking_lot)
    db.commit()
    db.refresh(db_parking_lot)
    return db_parking_lot

def get_parking_lots_by_user(db: Session, user_id: int):
    return db.query(models.ParkingLot).filter(models.ParkingLot.user_id == user_id).all()

def update_parking_lot_info(db:Session, parking_lot_id: int, parking_lot: schemas.ParkingLotCreate, user_id: int):
    db_parking_lot = db.query(models.ParkingLot).filter(models.ParkingLot.id == parking_lot_id, models.ParkingLot.user_id == user_id).first()
    if db_parking_lot:
        db_parking_lot.name = parking_lot.name
        db_parking_lot.location = parking_lot.location
        db_parking_lot.capacity = parking_lot.capacity
        db_parking_lot.available_spots = parking_lot.available_spots
        db.commit()
        db.refresh(db_parking_lot)
    return db_parking_lot

def remove_parking_lot(db: Session, parking_lot_id: int, user_id: int):
    db_parking_lot = db.query(models.ParkingLot).filter(models.ParkingLot.id == parking_lot_id, models.ParkingLot.user_id == user_id).first()
    if db_parking_lot:
        db.delete(db_parking_lot)
        db.commit()
    return db_parking_lot