from fastapi import FastAPI

from routers import router as AI_router
from middleware import add_cors_middleware

import uvicorn
app = FastAPI()


# Include history routes
app.include_router(AI_router, prefix="/AI", tags=["AI"])

add_cors_middleware(app)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)