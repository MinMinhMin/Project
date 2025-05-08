from fastapi import FastAPI
from user.routes import router as user_router
from parkingLot.routes import router as parking_lot_router
from db.database import Base, engine

from middleware import add_cors_middleware

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include user routes
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(parking_lot_router, prefix="/parking_lot", tags=["parking_lot"])
add_cors_middleware(app)
