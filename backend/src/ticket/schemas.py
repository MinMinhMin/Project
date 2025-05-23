from pydantic import BaseModel
from typing import Optional

class TicketCreate(BaseModel):
    ticket_id: int
    status: Optional[str] = "Không Được Sử Dụng"
    parking_lot_id: int

class Ticket(TicketCreate):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# New model for update request
class TicketStatusUpdate(BaseModel):
    ticket_id: int
    status: str
    parking_lot_id: int