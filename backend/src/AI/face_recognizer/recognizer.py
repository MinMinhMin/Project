import cv2
from deepface import DeepFace
import numpy as np


class FaceRecognizer:
    def __init__(self, model_name="Facenet", enforce_detection=True):
        """
        Khởi tạo mô hình nhận diện khuôn mặt.
        model_name: Một trong các mô hình được DeepFace hỗ trợ (eg: VGG-Face, Facenet, ArcFace, Dlib, SFace...)
        enforce_detection: Nếu False thì không cần bắt buộc có khuôn mặt trong ảnh (dễ debug hơn)
        """
        self.model_name = model_name
        self.enforce_detection = enforce_detection
        self.model = DeepFace.build_model(model_name)

    def load_image(self, img_path):
        """
        Load ảnh từ đường dẫn. Trả về ảnh RGB.
        """
        img_bgr = cv2.imread(img_path)
        if img_bgr is None:
            raise FileNotFoundError(f"Image not found: {img_path}")
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
                model=self.model,
                model_name=self.model_name,
                enforce_detection=self.enforce_detection
            )[0]["embedding"]
            return np.array(embedding)
        except Exception as e:
            print(f"Failed to get embedding: {e}")
            return None


""" Example usage:
from recognizer import FaceRecognizer
recog = FaceRecognizer(model_name="Facenet")  # hoặc "ArcFace", "VGG-Face", v.v.
img = recog.load_image("face_image.jpg")
embedding = recog.get_embedding(img)

if embedding is not None:
    print("Embedding shape:", embedding.shape)
else:
    print("No face found.")
"""