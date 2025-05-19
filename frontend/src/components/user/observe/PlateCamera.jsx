import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

const backendUrl_AI = import.meta.env.VITE_API_URL_AI;

const FIXED_WIDTH = 640;
const FIXED_HEIGHT = 480;

const PlateCamera = forwardRef(({ videoRef }, ref) => {
  const overlayRef = useRef(null);
  const socketRef = useRef(null);
  const sendCanvasRef = useRef(null);
  const fpsTimerRef = useRef(null); // <-- to store interval

  const [boxHistory, setBoxHistory] = useState([]);
  const stabilityThreshold = 20;
  const stabilityDuration = 3000;

  // Clean up WebSocket and interval
  const stopDetection = () => {
    if (fpsTimerRef.current) {
      clearInterval(fpsTimerRef.current);
      fpsTimerRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    // Clear canvas
    const canvas = overlayRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Clear box history
    setBoxHistory([]);
  };

  const initializeWebSocket = () => {
    const socket = new WebSocket(`${backendUrl_AI}/AI/streamPlate`);
    socketRef.current = socket;

    socket.onmessage = (evt) => {
      const { box } = JSON.parse(evt.data);
      const canvas = overlayRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = FIXED_WIDTH;
      canvas.height = FIXED_HEIGHT;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (box) {
        let { x, y, w, h } = box;
        y += 80;
        x = Math.max(0, Math.min(x, FIXED_WIDTH - w));
        y = Math.max(0, Math.min(y, FIXED_HEIGHT - h)) - 80;
        w = Math.min(w, FIXED_WIDTH - x);
        h = Math.min(h, FIXED_HEIGHT - y);

        setBoxHistory((prev) => {
          const newHistory = [
            ...prev,
            { x, y, w, h, timestamp: Date.now() },
          ].slice(-10);
          return newHistory;
        });

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);
      }
    };

    socket.onerror = () => {
      console.error("WebSocket error in PlateCamera");
    };

    fpsTimerRef.current = setInterval(() => {
      if (
        !sendCanvasRef.current ||
        !videoRef.current ||
        socket.readyState !== WebSocket.OPEN
      ) {
        return;
      }

      const c = sendCanvasRef.current;
      c.width = FIXED_WIDTH;
      c.height = FIXED_HEIGHT;
      c.getContext("2d").drawImage(videoRef.current, 0, 0, c.width, c.height);

      c.toBlob((blob) => blob && socket.send(blob), "image/jpeg", 0.9);
    }, 200);
  };

  // Imperative Handle
  useImperativeHandle(
    ref,
    () => ({
      takeSnapshot() {
        const video = videoRef.current;
        const canvas = sendCanvasRef.current;
        if (!video || !canvas) return null;

        canvas.width = FIXED_WIDTH;
        canvas.height = FIXED_HEIGHT;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const recentBoxes = boxHistory.filter(
          (box) => Date.now() - box.timestamp <= stabilityDuration
        );
        if (recentBoxes.length < 2) return null;

        const isStable = recentBoxes.every((box, i) => {
          if (i === 0) return true;
          const prevBox = recentBoxes[i - 1];
          return (
            Math.abs(box.x - prevBox.x) <= stabilityThreshold &&
            Math.abs(box.y - prevBox.y) <= stabilityThreshold &&
            Math.abs(box.w - prevBox.w) <= stabilityThreshold &&
            Math.abs(box.h - prevBox.h) <= stabilityThreshold
          );
        });

        if (!isStable) return null;

        const latestBox = recentBoxes[recentBoxes.length - 1];
        let { x, y, w, h } = latestBox;

        x = Math.max(0, Math.min(x, FIXED_WIDTH - w));
        y = Math.max(0, Math.min(y, FIXED_HEIGHT - h)) - 10;
        w = Math.min(w, FIXED_WIDTH - x);
        h = Math.min(h, FIXED_HEIGHT - y);

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = w;
        tempCanvas.height = h;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);

        return tempCanvas.toDataURL("image/jpeg", 0.9);
      },

      startStream(deviceIndex = 0) {
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            const videoDevices = devices.filter((d) => d.kind === "videoinput");
            const selectedDeviceId =
              videoDevices[deviceIndex]?.deviceId || videoDevices[0]?.deviceId;
            return navigator.mediaDevices.getUserMedia({
              video: { deviceId: { exact: selectedDeviceId } },
              audio: false,
            });
          })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.onloadedmetadata = () => {
                initializeWebSocket(); // <-- only after video loads
              };
            }
          })
          .catch((err) => {
            console.error("Camera access error:", err);
          });
      },

      stopStream() {
        stopDetection();

        const stream = videoRef.current?.srcObject;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
      },
    }),
    [videoRef, boxHistory]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", borderRadius: 8 }}
      />
      <canvas
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          borderRadius: 8,
        }}
      />
      <canvas ref={sendCanvasRef} style={{ display: "none" }} />
    </div>
  );
});

export default PlateCamera;
