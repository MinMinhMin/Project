from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from db import models
from . import schemas, crud
from db.database import get_db

from user.auth import get_current_user


router = APIRouter()



@router.post("/create", response_model=schemas.ParkingLot)
def create_parking_lot(parking_lot: schemas.ParkingLotCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_parking_lot(db=db, parking_lot=parking_lot, user_id=current_user.id)

@router.get("/get", response_model=List[schemas.ParkingLot])
def read_parking_lots(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.get_parking_lots_by_user(db=db, user_id=current_user.id)

@router.put("/update/{parking_lot_id}", response_model=schemas.ParkingLot)
def update_parking_lot(parking_lot_id: int, parking_lot: schemas.ParkingLotCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_parking_lot = crud.update_parking_lot_info(db=db, parking_lot_id=parking_lot_id, parking_lot=parking_lot, user_id=current_user.id)
    if not db_parking_lot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Parking lot not found or not authorized")
    return db_parking_lot

@router.delete("/delete/{parking_lot_id}", response_model=schemas.ParkingLot)
def delete_parking_lot(parking_lot_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_parking_lot = crud.remove_parking_lot(db=db, parking_lot_id=parking_lot_id, user_id=current_user.id)
    if not db_parking_lot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Parking lot not found or not authorized")
    return db_parking_lot
