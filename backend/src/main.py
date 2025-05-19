from fastapi import FastAPI
from user.routes import router as user_router
from parkingLot.routes import router as parking_lot_router
from history.routes import router as history_router
from ticket.routes import router as ticket_router

from db.database import Base, engine

from middleware import add_cors_middleware

import uvicorn

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include user routes
app.include_router(user_router, prefix="/user", tags=["user"])
# Include parking lot routes
app.include_router(parking_lot_router, prefix="/parking_lot", tags=["parking_lot"])
# Include history routes
app.include_router(history_router, prefix="/history", tags=["history"])
# Include ticket routes
app.include_router(ticket_router, prefix="/ticket", tags=["ticket"])

add_cors_middleware(app)



if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)