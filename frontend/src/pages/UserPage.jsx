import React, { useRef, useState } from "react";
import Camera from "../components/Camera";
import CameraController from "../components/CameraController";
import UnSavedImagesBox from "../components/UnSavedFaceImagesBox";

import "../styles/UserPage.css";

const UserPage = () => {
  const cameraRef = useRef();
  const [deviceId, setDeviceId] = useState(null);
  const [images, setImages] = useState([]);

  const handleStop = () => {
    cameraRef.current?.stopCamera();
  };

  const handleSnap = () => {
    const dataUrl = cameraRef.current?.takeSnapshot();
    if (dataUrl) {
      const timestamp = new Date().toISOString();
      setImages((prev) => [...prev, { dataUrl, saved: false, timestamp }]);
    }
  };

  const handleChangeDevice = (id) => {
    setDeviceId(id);
  };

  return (
    <div className="userPage">
      <CameraController
        onStop={handleStop}
        onSnap={handleSnap}
        onChangeDevice={handleChangeDevice}
      />
      <Camera ref={cameraRef} deviceId={deviceId} />
      <UnSavedImagesBox images={images} setImages={setImages} />
    </div>
  );
};

export default UserPage;
