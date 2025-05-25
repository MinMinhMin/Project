# parking_lot/schemas.py
from pydantic import BaseModel
from typing import Optional

class ParkingLotCreate(BaseModel):
    name: str
    location: str
    capacity: Optional[int] = None
    available_spots: Optional[int] = None

class ParkingLotUpdate(BaseModel):
    name: str
    location: str
    capacity: Optional[int] = None

class ParkingLot(ParkingLotCreate):
    id: int
    user_id: int
    userName: Optional[str] = None  # Add username from users table
    contact: Optional[str] = None   # Add phone_number from users table

    class Config:
        orm_mode = True