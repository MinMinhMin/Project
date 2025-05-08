from pydantic import BaseModel
from typing import Optional

class ParkingLotCreate(BaseModel):
    name: str
    location: str
    capacity: Optional[int] = None
    available_spots: Optional[int] = None

class ParkingLot(ParkingLotCreate):
    id: int
    user_id: int

    class Config:
        orm_mode = True
