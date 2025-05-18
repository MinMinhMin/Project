import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

const backendUrl = import.meta.env.VITE_API_URL;

const PlateCamera = forwardRef(
  ({ videoRef /* DOM ref from parent */ }, ref) => {
    // Refs for internal use
    const overlayRef = useRef(null);
    const socketRef = useRef(null);
    const sendCanvasRef = useRef(null);

    // State for stability
    const [boxHistory, setBoxHistory] = useState([]);
    const stabilityThreshold = 10; // Max pixel difference for stability
    const stabilityDuration = 3000; // 3 seconds for stability check

    /* ---------- Expose takeSnapshot() to the parent ---------- */
    useImperativeHandle(
      ref,
      () => ({
        takeSnapshot() {
          const video = videoRef.current;
          const canvas = sendCanvasRef.current;
          if (!video || !canvas) return null;

          // Draw the current video frame
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Use the latest stable box for cropping
          const recentBoxes = boxHistory.filter(
            (box) => Date.now() - box.timestamp <= stabilityDuration
          );
          if (recentBoxes.length < 2) {
            console.log(
              `Not enough plate data (${recentBoxes.length}/2). Ensure plate is detected and steady.`
            );
            return null;
          }

          // Check stability
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

          if (!isStable) {
            console.log("Face is moving. Keep steady and try again.");
            return null;
          }

          // Use the latest box for cropping with adjustments
          const latestBox = recentBoxes[recentBoxes.length - 1];
          let { x, y, w, h } = latestBox;

          // Clamp lại hợp lý cho snapshot (không dịch thêm)
          x = Math.max(0, Math.min(x, 640 - w));
          y = Math.max(0, Math.min(y, 480 - h)) - 80;
          w = Math.min(w, 640 - x);
          h = Math.min(h, 480 - y);

          // Create a temporary canvas for cropping
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = w;
          tempCanvas.height = h;
          const tempCtx = tempCanvas.getContext("2d");
          tempCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);

          return tempCanvas.toDataURL("image/jpeg", 0.9);
        },
      }),
      [videoRef, boxHistory]
    );

    /* ---------- WebSocket overlay & frame sending ---------- */
    useEffect(() => {
      if (!videoRef.current) return;

      const socket = new WebSocket(`${backendUrl}/test/streamPlate`);
      socketRef.current = socket;

      // Draw the green rectangle from server data
      socket.onmessage = (evt) => {
        const { box } = JSON.parse(evt.data);
        const canvas = overlayRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (box) {
          // Clamp coordinates
          let { x, y, w, h } = box;
          // Dịch khung vẽ xuống để cân đối vị trí biển số
          y += 80;

          // Clamp cho overlay
          x = Math.max(0, Math.min(x, 640 - w));
          y = Math.max(0, Math.min(y, 480 - h));
          w = Math.min(w, 640 - x);
          h = Math.min(h, 480 - y);

          // Update box history for stability check
          setBoxHistory((prev) => {
            const newHistory = [
              ...prev,
              { x, y, w, h, timestamp: Date.now() },
            ].slice(-10); // Keep last 10 boxes
            return newHistory;
          });

          // Draw bounding box
          ctx.strokeStyle = "lime";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, w, h);
        }
      };

      // Send frames every 200ms (5 fps)
      const fpsTimer = setInterval(() => {
        if (
          !sendCanvasRef.current ||
          !videoRef.current ||
          socket.readyState !== WebSocket.OPEN
        ) {
          return;
        }

        const c = sendCanvasRef.current;
        c.width = videoRef.current.videoWidth;
        c.height = videoRef.current.videoHeight;
        c.getContext("2d").drawImage(videoRef.current, 0, 0, c.width, c.height);

        c.toBlob((blob) => blob && socket.send(blob), "image/jpeg", 0.9);
      }, 200);

      socket.onerror = () => {
        console.error("WebSocket error");
      };

      return () => {
        clearInterval(fpsTimer);
        socket.close();
      };
    }, [videoRef]);

    /* ---------- UI ---------- */
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
  }
);

export default PlateCamera;
