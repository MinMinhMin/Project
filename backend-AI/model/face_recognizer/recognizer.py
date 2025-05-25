import cv2
from deepface import DeepFace
import numpy as np
import base64
from scipy.spatial.distance import cosine
import requests

class FaceRecognizer:
    def __init__(self, model_name="Facenet", enforce_detection=True):
        """
        Khởi tạo mô hình nhận diện khuôn mặt.
        model_name: Một trong các mô hình được DeepFace hỗ trợ (eg: VGG-Face, Facenet, ArcFace, Dlib, SFace...)
        enforce_detection: Nếu False thì không cần bắt buộc có khuôn mặt trong ảnh (dễ debug hơn)
        """
        self.model_name = model_name
        self.enforce_detection = enforce_detection


    def load_image(self, src):
        """
        Load ảnh từ URL hoặc chuỗi base64. Trả về ảnh RGB.

        - Nếu chuỗi bắt đầu bằng 'http' hoặc 'https', sẽ xử lý như URL.
        - Ngược lại, xử lý như chuỗi base64.
        """
        if isinstance(src, str) and src.startswith(('http://', 'https://')):
            headers = {
                "User-Agent": "Mozilla/5.0"
            }
            response = requests.get(src, headers=headers)
            if response.status_code != 200:
                raise FileNotFoundError(f"Image not found at URL: {src} (status code {response.status_code})")
            image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
        else:
            try:
                image_data = base64.b64decode(src)
                image_array = np.frombuffer(image_data, dtype=np.uint8)
            except Exception as e:
                raise ValueError(f"Error decoding base64 image: {e}")

        img_bgr = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        if img_bgr is None:
            raise ValueError("Failed to decode image")

        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        return img_rgb

    def get_embedding(self, img):
        """
        Trích xuất face embedding từ ảnh RGB có chứa khuôn mặt.
        Trả về vector embedding (np.ndarray) hoặc None nếu không tìm thấy khuôn mặt.
        """
        try:
            embedding = DeepFace.represent(
                img_path=img,
                model_name=self.model_name,
                enforce_detection=self.enforce_detection
            )[0]["embedding"]
            return np.array(embedding)
        except Exception as e:
            print(f"Failed to get embedding: {e}")
            return None

    def is_match(self, embedding1: np.ndarray, embedding2: np.ndarray, threshold: float = 0.3) -> bool:
        """
        So sánh hai face embedding để kiểm tra xem có phải cùng một người không.
        threshold: Ngưỡng xác định xem hai vector có giống nhau không (cosine distance).
        Trả về True nếu là cùng người, False nếu không.
        """
        if embedding1 is None or embedding2 is None:
            return False

        distance = cosine(embedding1, embedding2)
        return distance < threshold


""" Example usage:
from recognizer import FaceRecognizer
recog = FaceRecognizer(model_name="Facenet")  # hoặc "ArcFace", "VGG-Face", v.v.
img = recog.load_image("https://i.imgur.com/snvt2pr.png")
embedding = recog.get_embedding(img)

if embedding is not None:
    print("Embedding shape:", embedding.shape)
else:
    print("No face found.")

"""