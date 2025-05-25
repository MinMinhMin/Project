from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserUpdate(BaseModel):
    username: str | None = None
    password: str | None = None
    full_name: str | None = None
    phone_number: str | None = None


class User(BaseModel):
    id: int
    username: str
    role: str  # <-- Add this
    full_name: str | None = None
    phone_number: str | None = None

    class Config:
        orm_mode = True
