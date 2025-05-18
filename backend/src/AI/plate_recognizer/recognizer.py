import cv2
import torch
from .function import utils_rotate
from .function import helper
import requests
import numpy as np
import base64
import os

class PlateRecognizer:
    def __init__(self):
        # Load YOLO models

        base_path = os.path.dirname(__file__)  # chính là AI/plate_recognizer

        yolov5_path = os.path.join(base_path, 'yolov5')
        model_lp_path = os.path.join(base_path, 'model/LP_detector.pt')

        model_ocr_path = os.path.join(base_path, 'model/LP_ocr.pt')

        self.yolo_LP_detect = torch.hub.load(yolov5_path, 'custom', path=model_lp_path, force_reload=True, source='local')
        print("yolov5 path:", yolov5_path)
        self.yolo_license_plate = torch.hub.load(yolov5_path, 'custom', path=model_ocr_path, force_reload=True, source='local')
        self.yolo_license_plate.conf = 0.60

    def load_image(self, src):
        """
        Load image from a URL or a base64 string.
        - If `src` starts with 'http' or 'https', treat it as a URL.
        - Otherwise, treat it as a base64-encoded string.
        """
        if isinstance(src, str) and src.startswith(('http://', 'https://')):
            # Load from URL
            headers = {
                "User-Agent": "Mozilla/5.0"
            }
            response = requests.get(src, headers=headers)
            if response.status_code != 200:
                raise FileNotFoundError(f"Image not found at URL: {src} (status code {response.status_code})")

            image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
        else:
            # Load from base64 string
            try:
                image_data = base64.b64decode(src)
                image_array = np.frombuffer(image_data, dtype=np.uint8)
            except Exception as e:
                raise ValueError(f"Error decoding base64 image: {e}")

        img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Failed to decode image")
        return img

    def detect_plate_box(self, img):
        """
        Trả về bounding box đầu tiên của biển số nếu detect được.
        Nếu không detect được, fallback trả về toàn bộ ảnh [0, 0, w, h].
        """
        plates = self.yolo_LP_detect(img, size=640)
        boxes = plates.pandas().xyxy[0].values.tolist()

        if boxes:
            # Lấy box đầu tiên và ép về int
            x1, y1, x2, y2 = map(int, boxes[0][:4])
            return [x1, y1, x2, y2]
        else:
            # fallback: dùng toàn bộ ảnh
            h, w = img.shape[:2]
            return [0, 0, w, h]



    def detect_plate(self, img):
        """
        Detect và nhận dạng biển số từ ảnh.
        Trả về chuỗi mã biển số (hoặc "unknown" nếu không nhận được).
        """
        # Lấy vùng ảnh chứa biển số (nếu detect được) hoặc toàn ảnh
        x1, y1, x2, y2 = self.detect_plate_box(img)
        plate_img = img[y1:y2, x1:x2]

        # Deskew + OCR
        plate_number = "unknown"
        for cc in range(2):
            for ct in range(2):
                rotated = utils_rotate.deskew(plate_img, cc, ct)
                plate_number = helper.read_plate(self.yolo_license_plate, rotated)
                if plate_number != "unknown":
                    break
            if plate_number != "unknown":
                break

        return plate_number



""" recog = PlateRecognizer()
img = recog.load_image("https://i.imgur.com/hKfidAz.png")
print(recog.detect_plate_boxes(img))
print(recog.detect_plate(img))  """


