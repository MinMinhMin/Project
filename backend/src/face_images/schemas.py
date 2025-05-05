from pydantic import BaseModel
from typing import Optional

class FaceImageBase(BaseModel):
    image_url: str

class FaceImageCreate(FaceImageBase):
    user_id: int

class FaceImage(FaceImageBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True  # This allows the use of ORM models with Pydantic
