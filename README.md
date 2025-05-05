This project includes:

- Back-end: FastAPI (Python)
- Front-end: React + Vite (JavaScript)

## Backend Setup
- Install back-end packages
  ```batch
   pip install requirements.txt
   ```
- Start a back-end server (the server is hosted at port 8000 by default, can be customized in main.py)
  ```batch
   cd backend/src
   
   ```
  ```batch
   uvicorn main:app   
   ```
## Frontend Setup
- Install Node.js at [here](https://nodejs.org/en)
- Install front-end packages
  ```batch
   cd frontend
   
   ```
  ```batch
   npm install
   
   ```
- Start a front-end server (the server is hosted at port 3000 by default, can be customized in vite.config.js)
   ```batch
   cd frontend
   
   ```
   ```batch
   npm run dev
   
   ```
## Database
- Images which taken from the camera are hosted by Imgur (SQLite's table does not contain images, it only contains image URLs).
- Details at backend/src/face_images/routes.py 
## Setup Docker
Find a base Docker image on Docker Hub that contains Node.js and Python, then make a compose file to do the things above.
