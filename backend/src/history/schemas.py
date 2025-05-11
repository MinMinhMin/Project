from pydantic import BaseModel
from typing import List,Optional

class HistoryCreate(BaseModel):  # <-- Rename this
    face_image_path: str
    license_plate_image_path: str
    face_embedding: List[float]
    license_plate: str
    parking_lot_id: int

class History(HistoryCreate):  # <-- Also update inheritance
    id: int
    user_id: int

    class Config:
        orm_mode = True
