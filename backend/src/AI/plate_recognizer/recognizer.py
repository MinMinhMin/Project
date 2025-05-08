import cv2
import torch
import function.utils_rotate as utils_rotate
import function.helper as helper


class PlateRecognizer:
    def __init__(self):
        # Load YOLO models
        self.yolo_LP_detect = torch.hub.load('yolov5', 'custom', path='model/LP_detector.pt', force_reload=True, source='local')
        self.yolo_license_plate = torch.hub.load('yolov5', 'custom', path='model/LP_ocr.pt', force_reload=True, source='local')
        self.yolo_license_plate.conf = 0.60

    def load_image(self, img_path):
        """
        Load image from path.
        """
        img = cv2.imread(img_path)
        if img is None:
            raise FileNotFoundError(f"Image not found: {img_path}")
        return img

    def detect_plate(self, img):
        """
        Detect and recognize license plate from input image.
        Returns the recognized plate number (str).
        """
        plates = self.yolo_LP_detect(img, size=640)
        list_plates = plates.pandas().xyxy[0].values.tolist()

        if not list_plates:
            plate_img = img
        else:
            # Chọn biển số đầu tiên
            x1, y1, x2, y2 = map(int, list_plates[0][:4])
            plate_img = img[y1:y2, x1:x2]

        # Deskew và OCR
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


""" Example usage:
from recognizer import PlateRecognizer

recog = PlateRecognizer()
img = recog.load_image("test_image/image.png")
plate_number = recog.detect_plate(img)
print("Detected Plate:", plate_number)

"""
