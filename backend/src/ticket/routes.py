from sqlalchemy.orm import Session
from typing import List, Optional

from db import models
from . import schemas, crud
from db.database import get_db

from user.auth import get_current_user
from fastapi import APIRouter, Depends

router = APIRouter()

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import models
from db.database import get_db  # Adjust path if needed
from . import crud, schemas
from user.auth import get_current_user  # Adjust this to your actual import path

router = APIRouter()

@router.post("/reset_and_create")
def reset_and_create_tickets(
    x: int,
    y: int,
    parking_lot_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if x > y:
        raise HTTPException(status_code=400, detail="X must be less than or equal to Y")

    # Step 1: Delete all tickets with the same parking_lot_id
    db.query(models.Ticket).filter(models.Ticket.parking_lot_id == parking_lot_id).delete()
    db.commit()

    # Step 2: Create tickets with ticket_id from x to y
    new_tickets = []
    for ticket_id in range(x, y + 1):
        ticket_data = schemas.TicketCreate(
            ticket_id=ticket_id,
            parking_lot_id=parking_lot_id,
            status="Không Được Sử Dụng"
        )
        ticket = crud.create_ticket(db, ticket_data, user_id=current_user.id)
        new_tickets.append(ticket)

    return {
        "message": f"{len(new_tickets)} tickets created successfully",
        "user_id": current_user.id,
        "range": [x, y],
        "parking_lot_id": parking_lot_id
    }

@router.get("/get_ticket_by_status")
def get_ticket_by_status(
    status: str,
    parking_lot_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    tickets = crud.get_ticket_by_status(db, status, parking_lot_id)
    return {
        "tickets": tickets,
        "user_id": current_user.id
    }

@router.put("/update_ticket_status/")
def update_ticket_status(
    ticket_update: schemas.TicketStatusUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    ticket = crud.get_ticket_by_id(db, ticket_update.ticket_id, ticket_update.parking_lot_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    updated_ticket = crud.update_ticket_status(db, ticket_update.ticket_id, ticket_update.status, ticket_update.parking_lot_id)
    return {
        "message": "Ticket status updated successfully",
        "ticket": updated_ticket,
        "user_id": current_user.id
    }