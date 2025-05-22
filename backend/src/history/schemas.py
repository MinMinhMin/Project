from datetime import date, time
from pydantic import BaseModel
from typing import List,Optional

class HistoryCreate(BaseModel):
    face_image_path_IN: Optional[str] = None
    license_plate_image_path_IN: Optional[str] = None
    face_embedding_IN: Optional[List[float]] = None  # ✅ Fix here
    license_plate_IN: Optional[str] = None

    face_image_path_OUT: Optional[str] = None
    license_plate_image_path_OUT: Optional[str] = None
    face_embedding_OUT: Optional[List[float]] = None  # ✅ Fix here
    license_plate_OUT: Optional[str] = None

    date_in: Optional[date] = None
    date_out: Optional[date] = None
    time_in: Optional[time] = None
    time_out: Optional[time] = None
    ticket_id: Optional[str] = None
    ticket_type: Optional[str] = None
    vehicle_type: Optional[str] = None
    parking_lot_id: Optional[int] = None  # Also mark this Optional

class HistoryUpdate(BaseModel):
    face_image_path_IN: Optional[str] = None
    license_plate_image_path_IN: Optional[str] = None
    face_embedding_IN: Optional[List[float]] = None  # ✅ Fix here
    license_plate_IN: Optional[str] = None

    face_image_path_OUT: Optional[str] = None
    license_plate_image_path_OUT: Optional[str] = None
    face_embedding_OUT: Optional[List[float]] = None  # ✅ Fix here
    license_plate_OUT: Optional[str] = None

    date_in: Optional[date] = None
    date_out: Optional[date] = None
    time_in: Optional[time] = None
    time_out: Optional[time] = None
    ticket_id: Optional[str] = None
    ticket_type: Optional[str] = None





class History(HistoryCreate):  # <-- Also update inheritance
    id: int
    user_id: int

    class Config:
        orm_mode = True
