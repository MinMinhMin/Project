from fastapi.middleware.cors import CORSMiddleware

def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allows all origins, adjust as needed
        allow_credentials=True,
        allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, OPTIONS)
        allow_headers=["*"],  # Allows all headers
    )