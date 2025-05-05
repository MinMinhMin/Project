import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "../styles/Camera.module.css";

const Camera = forwardRef(({ deviceId }, ref) => {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    takeSnapshot() {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      return canvas.toDataURL("image/png");
    },
    stopCamera() {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    },
  }));

  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
          video: { deviceId: deviceId ? { exact: deviceId } : undefined },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [deviceId]);

  return <video ref={videoRef} autoPlay playsInline className={styles.video} />;
});

export default Camera;
