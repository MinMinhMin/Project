from sqlalchemy.orm import Session
from . import schemas
from db import models

def create_face_image(db: Session, face_image: schemas.FaceImageBase, user_id: int):
    db_face_image = models.FaceImage(image_url=face_image.image_url, user_id=user_id)
    db.add(db_face_image)
    db.commit()
    db.refresh(db_face_image)
    return db_face_image

def get_face_images_by_user(db: Session, user_id: int):
    return db.query(models.FaceImage).filter(models.FaceImage.user_id == user_id).all()

def delete_face_image(db: Session, face_image_id: int):
    image = db.query(models.FaceImage).filter(models.FaceImage.id == face_image_id).first()
    if image:
        db.delete(image)
        db.commit()
    return image
def get_face_image_by_id(db: Session, image_id: int):
    return db.query(models.FaceImage).filter(models.FaceImage.id == image_id).first()