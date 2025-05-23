import base64
from fastapi import APIRouter, File, HTTPException, UploadFile, WebSocket
import cv2
import numpy as np
from deepface import DeepFace
import time
from collections import deque
from model.plate_recognizer.recognizer import PlateRecognizer
from model.face_recognizer.recognizer import FaceRecognizer
router = APIRouter()


plate_AI=PlateRecognizer()  # Khởi tạo đối tượng PlateRecognizer
face_AI=DeepFace  # Sử dụng DeepFace cho nhận diện khuôn mặt
face_embedding_reconizer=FaceRecognizer(model_name="Facenet")  # Khởi tạo đối tượng FaceRecognizer

@router.websocket("/streamFace")
async def streamFace_video(websocket: WebSocket):
    await websocket.accept()

    last_detect_time = 0
    detect_interval = 1.0  # giây
    last_box = None
    last_box_time = 0
    box_timeout = 2.0  # Giữ 2 giây
    box_history = deque(maxlen=5)  # Lưu tối đa 5 khung hợp lệ

    # Danh sách backend theo thứ tự ưu tiên
    backends = ['opencv', 'ssd']

    def get_stable_box(history):
        """Chọn khung ổn định từ lịch sử dựa trên trung bình kích thước và vị trí"""
        if not history:
            return None
        x_sum = y_sum = w_sum = h_sum = 0
        count = len(history)
        for box in history:
            x_sum += box["x"]
            y_sum += box["y"]
            w_sum += box["w"]
            h_sum += box["h"]
        return {
            "x": int(x_sum / count),
            "y": int(y_sum / count),
            "w": int(w_sum / count),
            "h": int(h_sum / count)
        }

    while True:
        try:
            data = await websocket.receive_bytes()

            # Chuyển byte -> ảnh
            np_img = np.frombuffer(data, dtype=np.uint8)
            frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
            if frame is None or frame.size == 0:
                print("Invalid frame: Empty or corrupted")
                await websocket.send_json({"box": last_box})
                continue
            frame = cv2.resize(frame, (640, 480))

            # Kiểm tra frame có quá tối không
            if frame.mean() < 20:
                print("Invalid frame: Too dark")
                await websocket.send_json({"box": last_box})
                continue

            current_time = time.time()
            if current_time - last_detect_time >= detect_interval:
                is_valid_box = False
                detected_box = None

                # Thử từng backend
                for backend in backends:
                    try:
                        print(f"Trying backend: {backend}")
                        result = face_AI.extract_faces(frame, detector_backend=backend, enforce_detection=False, align=True)
                        if result:
                            face = result[0]
                            region = face["facial_area"]
                            print(f"Detected box ({backend}):", region)

                            x = region["x"]
                            y = region["y"]
                            w = region["w"]
                            h = region["h"]

                            # Kiểm tra tính hợp lệ của bounding box
                            is_valid_box = True
                            if w > 640 * 0.8 or h > 480 * 0.8:
                                print(f"Invalid box: Too large ({backend})", region)
                                is_valid_box = False
                            if w < 640 * 0.1 or h < 480 * 0.1:
                                print(f"Invalid box: Too small ({backend})", region)
                                is_valid_box = False

                            if is_valid_box:
                                detected_box = {
                                    "x": x,
                                    "y": y,
                                    "w": w,
                                    "h": h
                                }
                                break  # Thoát vòng lặp nếu tìm được khung hợp lệ
                        else:
                            print(f"No face detected ({backend})")
                    except Exception as e:
                        print(f"DeepFace error ({backend}):", e)

                if is_valid_box and detected_box:
                    # Chỉnh box hợp lý
                    h_enlarged = int(detected_box["h"] * 1.5)  # Tăng chiều cao 50%
                    y_adjusted = max(0, detected_box["y"] + int(detected_box["h"] * 0.05))  # Dịch xuống dưới 5% chiều cao
                    w_enlarged = int(detected_box["w"] * 1.2)  # Tăng độ rộng 20%
                    x_adjusted = max(0, detected_box["x"] - int(w_enlarged * 0.1))  # Dịch sang trái 10% chiều rộng
                    x_adjusted = max(0, min(x_adjusted, 640 - w_enlarged))  # Đảm bảo x hợp lệ
                    y_adjusted = max(0, min(y_adjusted, 480 - h_enlarged))  # Đảm bảo y hợp lệ
                    w_enlarged = min(w_enlarged, 640 - x_adjusted)  # Giới hạn w trong frame
                    h_enlarged = min(h_enlarged, 480 - y_adjusted)  # Giới hạn h trong frame

                    last_box = {
                        "x": x_adjusted,
                        "y": y_adjusted,
                        "w": w_enlarged,
                        "h": h_enlarged
                    }
                    last_box_time = current_time
                    box_history.append(last_box)
                    print("Valid box accepted:", last_box)
                else:
                    # Nếu không tìm được khung hợp lệ, dùng khung ổn định từ lịch sử
                    last_box = get_stable_box(box_history)
                    if last_box:
                        print("No valid box detected, using stable box from history:", last_box)
                    elif current_time - last_box_time > box_timeout:
                        last_box = None
                        print("No valid box after retries, history empty, setting last_box to None")

                last_detect_time = current_time

            # Gửi box hiện tại
            await websocket.send_json({"box": last_box})

        except Exception as e:
            print("WebSocket connection closed:", e)
            break





@router.websocket("/streamPlate")
async def streamPlate_video(websocket: WebSocket):
    await websocket.accept()

    last_detect_time = 0
    detect_interval  = 0.5                # giây
    last_box         = None
    last_box_time    = 0
    box_timeout      = 2.0                # giây
    box_history      = deque(maxlen=5)

    def get_stable_box(history):
        if not history:
            return None
        x = sum(b["x"] for b in history) // len(history)
        y = sum(b["y"] for b in history) // len(history)
        w = sum(b["w"] for b in history) // len(history)
        h = sum(b["h"] for b in history) // len(history)
        return {"x": x, "y": y, "w": w, "h": h}

    while True:
        try:
            data   = await websocket.receive_bytes()
            frame  = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
            if frame is None or frame.size == 0:
                await websocket.send_json({"box": last_box})
                continue
            frame  = cv2.resize(frame, (640, 480))

            # chỉ detect mỗi 0.5 s
            now = time.time()
            if now - last_detect_time >= detect_interval:
                box_xyxy = plate_AI.detect_plate_box(frame)  # [x1,y1,x2,y2] hoặc [0,0,640,480]

                # Chuyển sang (x,y,w,h) + kiểm tra hợp lệ
                detected_box = None
                if box_xyxy is not None:
                    x1, y1, x2, y2 = map(int, box_xyxy)
                    w, h = x2 - x1, y2 - y1

                    # ---- bộ lọc ----
                    too_big   = w > 640 * 0.8 or h > 480 * 0.5   # >80 % chiều ngang, >50 % chiều cao
                    too_small = w < 640 * 0.1 or h < 480 * 0.05  # <10 % chiều ngang, <5 % chiều cao
                    if not (too_big or too_small):
                        detected_box = {"x": x1, "y": y1, "w": w, "h": h}

                # ---- cập nhật kết quả gửi về ----
                if detected_box:
                    last_box      = detected_box
                    last_box_time = now
                    box_history.append(last_box)
                else:
                    # fallback: box lịch sử (nếu còn “mới”) hoặc None
                    if now - last_box_time <= box_timeout:
                        last_box = get_stable_box(box_history)
                    else:
                        last_box = None

                last_detect_time = now

            await websocket.send_json({"box": last_box})

        except Exception as e:
            print("WebSocket closed:", e)
            break


@router.post("/getPlateNumber")
async def getPlateNumber(plate_image: UploadFile = File(...)):
    plate_image_content = plate_image.file.read()
    base64_plate_img = base64.b64encode(plate_image_content).decode("utf-8")

    try:
        plate_img = plate_AI.load_image(base64_plate_img)
        license_plate = plate_AI.detect_plate(plate_img)
    except Exception as e:
         raise HTTPException(status_code=400, detail=f"Plate recognition error: {e}")

    return {"license_plate": license_plate}

@router.post("/getFaceEmbedding")
async def getFaceEmbedding(face_image: UploadFile = File(...)):
    face_image_content = face_image.file.read()
    base64_face_img = base64.b64encode(face_image_content).decode("utf-8")

    try:
        face_img = face_embedding_reconizer.load_image(base64_face_img)
        embedding = face_embedding_reconizer.get_embedding(face_img)
    except Exception as e:
         raise HTTPException(status_code=400, detail=f"Face recognition error: {e}")

    if embedding is None:
        return {"embedding": []}
    return {"embedding": embedding.tolist()}