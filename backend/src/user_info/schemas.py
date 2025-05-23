from pydantic import BaseModel

class UserInfoCreate(BaseModel):
    full_name: str
    phone_number: str

class UserInfo(UserInfoCreate):
    id: int
    user_id: int

    class Config:
        orm_mode = True