from sqlalchemy.orm import Session
from . import schemas
from db import models

def create_ticket(db: Session, ticket: schemas.TicketCreate, user_id: int):
    db_ticket = models.Ticket(
        ticket_id=ticket.ticket_id,
        status=ticket.status,
        parking_lot_id=ticket.parking_lot_id,
        user_id=user_id
    )
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

def get_ticket_by_status(db: Session, status: str, parking_lot_id: int):
    return db.query(models.Ticket).filter(models.Ticket.status == status).filter(models.Ticket.parking_lot_id == parking_lot_id).all()


def update_ticket_status(db: Session, ticket_id: int, status: str, parking_lot_id: int):
    ticket = db.query(models.Ticket).filter(
        (models.Ticket.ticket_id == ticket_id) & (models.Ticket.parking_lot_id == parking_lot_id)
    ).first()
    if ticket:
        ticket.status = status
        db.commit()
        db.refresh(ticket)
        return ticket
    return None

def get_ticket_by_id(db: Session, ticket_id: int, parking_lot_id: int):
    return db.query(models.Ticket).filter(
        (models.Ticket.ticket_id == ticket_id) & (models.Ticket.parking_lot_id == parking_lot_id)
    ).first()