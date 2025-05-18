from fastapi import FastAPI

from routers import router as AI_router
from middleware import add_cors_middleware

app = FastAPI()


# Include history routes
app.include_router(AI_router, prefix="/AI", tags=["AI"])

add_cors_middleware(app)
