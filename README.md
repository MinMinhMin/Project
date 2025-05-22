This project includes:

- Back-end: FastAPI (Python)
- Front-end: React + Vite (JavaScript)

## Backend Setup
- Install back-end packages
  ```batch
   pip install -r requirements.txt
   ```
  ```batch
   pip install torch==2.3.1+cu118 torchvision==0.18.1+cu118 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cu118
   ```
- Start a back-end server (the server is hosted at port 8000 by default, can be customized in main.py)
  ```batch
   cd backend/src
   
   ```
  ```batch
   python main.py 
   ```
- Start a back-end-AI server (the server is hosted at port 8001 by default, can be customized in main.py)
```batch
 cd backend-AI
 
 ```
```batch
 python main.py 
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
## Camera Setup

### Hardware Requirements:

- *2 webcams*:
  - For *desktop PCs*: 2 external webcams are required.
  - For *laptops*: 1 built-in webcam + 1 external webcam is sufficient.

### If don't have enough webcams:

   Use Android phone as a webcam by following these steps:

 *Install the required apps:*
   - On Android phone: install *DroidCam* from the Google Play Store.
   - On computer: download and install *DroidCam Client* from the official website: [https://www.dev47apps.com/](https://www.dev47apps.com/)

 *Connect both devices:*
   - Make sure your *phone and computer are connected to the same Wi-Fi network*.
   - Open the *DroidCam app on your phone* and note the IP(Wifi) address displayed.
   - Open the *DroidCam Client on your computer*, enter the IP(Wifi) address and port from your phone, then click *Start*.

 *Verify the connection:*
   If successful, your phone will act as a webcam and can be used as a substitute for a physical webcam.




## Admin
- Username: admin
- Password: 123
## User
- Username: minmin
- Password: 123
## Database
- Images which taken from the camera are hosted by Imgur (SQLite's table does not contain images, it only contains image URLs).
- Details at backend/src/face_images/routes.py 
## Setup Docker
- Find a base Docker image on Docker Hub that contains Node.js and Python, then make a compose file to do the things above.
- Package backend, backend-AI, frontend into 3 docker compose
- Docker 1 (backend):
  - Package:Python 3.11.5
   ```batch
   pip install -r requirements.txt
   ```
  - Host:
  ```batch
   cd backend/src
   ```
  ```batch
   python main.py 
   ```
- Docker 2 (backend-AI): 
  - Package: Python 3.11.5
  ```batch
   pip install torch==2.3.1+cu118 torchvision==0.18.1+cu118 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cu118
   ```
  - Host:
    ```batch
     cd backend-AI
     ```
    ```batch
     python main.py 
     ```
- Docker 3 (frontend):
  - Package: Node.js
     ```batch
     cd frontend
     ```
     ```batch
     npm install
      ```
  - Host:
     ```batch
     cd frontend
     ```
     ```batch
     npm run dev
     ```

  
