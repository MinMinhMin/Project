from pydantic import BaseModel

class ParkingLotCreate(BaseModel):
    name: str
    location: str
    capacity: int
    available_spots: int

class ParkingLot(ParkingLotCreate):
   user_id: int

