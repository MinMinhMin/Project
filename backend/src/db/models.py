from sqlalchemy import Column, ForeignKey, Integer, String
from db.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # This is NOT a database column — it helps you access user's images via ORM
    face_images = relationship("FaceImage", back_populates="owner", cascade="all, delete")


class FaceImage(Base):
    __tablename__ = "face_images"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="face_images")