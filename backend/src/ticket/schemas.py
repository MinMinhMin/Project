from pydantic import BaseModel
from typing import Optional

class TicketCreate(BaseModel):
    ticket_id:int
    status: Optional[str] = "Không Được Sử Dụng"  # Default value
    parking_lot_id: int

class Ticket(TicketCreate):
    id: int
    user_id: int

    class Config:
        orm_mode = True