from sqlalchemy import Column, ForeignKey, Integer, String,Float,Time,Date
from db.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")  # <-- Add this line

    parking_lots = relationship("ParkingLot", back_populates="owner", cascade="all, delete")
    tickets = relationship("Ticket", back_populates="user", cascade="all, delete")
    histories = relationship("History", back_populates="user", cascade="all, delete")


class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String)
    status = Column(String, default="Không Được Sử Dụng")  # <-- Add this line
    parking_lot_id = Column(Integer, ForeignKey("parking_lots.id"))

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="tickets")
    parking_lot = relationship("ParkingLot", back_populates="tickets")


class ParkingLot(Base):
    __tablename__ = "parking_lots"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String, index=True)
    capacity = Column(Integer)
    available_spots = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="parking_lots")
    histories = relationship("History", back_populates="parking_lot", cascade="all, delete")
    tickets = relationship("Ticket", back_populates="parking_lot", cascade="all, delete")

class History(Base):
    __tablename__ = "history"
    id = Column(Integer, primary_key=True, index=True)

    face_image_path_IN = Column(String)
    license_plate_image_path_IN = Column(String)
    face_embedding_IN = Column(String)
    license_plate_IN = Column(String)

    face_image_path_OUT = Column(String)
    license_plate_image_path_OUT = Column(String)
    face_embedding_OUT = Column(String)
    license_plate_OUT = Column(String)

    date_in = Column(Date)
    date_out = Column(Date)
    time_in = Column(Time)
    time_out = Column(Time)
    ticket_id = Column(String)
    ticket_type = Column(String)
    vehicle_type = Column(String)


    parking_lot_id = Column(Integer, ForeignKey("parking_lots.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="histories")
    parking_lot = relationship("ParkingLot", back_populates="histories")

