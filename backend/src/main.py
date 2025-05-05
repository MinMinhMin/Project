from fastapi import FastAPI
from user.routes import router as user_router
from face_images.routes import router as face_image_router
from db.database import Base, engine

from middleware import add_cors_middleware

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include user routes
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(face_image_router, prefix="/face_images", tags=["face_images"])
add_cors_middleware(app)
