## Project overview
- Bảo viết vào hộ cái
## Camera Setup

### Hardware Requirements:

- *2 webcams*:
  - For *desktop PCs*: 2 external webcams are required.
  - For *laptops*: 1 built-in webcam + 1 external webcam is sufficient.

### If don't have enough webcams:

   Use Android/Ios phone as a webcam by following these steps:

 *Install the required apps:*
   - On Android/Ios: install *DroidCam* from the Google Play Store/App Store.
   - On computer: download and install *DroidCam Client* from the official website: [https://www.dev47apps.com/](https://www.dev47apps.com/)

 *Connect both devices:*
   - Make sure your *phone and computer are connected to the same Wi-Fi network*.
   - Open the *DroidCam app on your phone* and note the IP(Wifi) address displayed.
   - Open the *DroidCam Client on your computer*, enter the IP(Wifi) address and port from your phone, then click *Start*.

 *Verify the connection:*
   If successful, your phone will act as a webcam and can be used as a substitute for a physical webcam.


## Testing accounts

### Admin
- Username: admin
- Password: 123
### User
- Username: minmin
- Password: 123

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

  
