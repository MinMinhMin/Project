from sqlalchemy import Column, ForeignKey, Integer, String,Float
from db.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")  # <-- Add this line

    parking_lots = relationship("ParkingLot", back_populates="owner", cascade="all, delete")



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


class History(Base):
    __tablename__ = "history"
    id = Column(Integer, primary_key=True, index=True)
    face_image_path = Column(String)
    license_plate_image_path = Column(String)
    face_embedding = Column(String)
    license_plate = Column(String)


    parking_lot_id = Column(Integer, ForeignKey("parking_lots.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    parking_lot = relationship("ParkingLot", back_populates="histories")

