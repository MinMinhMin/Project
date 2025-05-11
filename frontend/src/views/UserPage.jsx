import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageDropSquare from "../components/ImageDropSquare";
import "../styles/UserPage.css";

import HistoryList from "../components/HistoryList";

const backendUrl = import.meta.env.VITE_API_URL;

export default function UserPage() {
  const [parkingLots, setParkingLots] = useState([]);
  const [sessionImages, setSessionImages] = useState({});
  const [currentSession, setCurrentSession] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${backendUrl}/parking_lot/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data || [];
        setParkingLots(data);

        const initialImages = {};
        data.forEach((_, index) => {
          initialImages[index] = [null, null, null, null];
        });
        setSessionImages(initialImages);
      })
      .catch((error) => {
        console.error("Error fetching parking lots:", error);
      });
  }, []);

  const handleImageChange = (index, imageFile) => {
    setSessionImages((prev) => {
      const updated = [...prev[currentSession]];
      updated[index] = imageFile;
      return { ...prev, [currentSession]: updated };
    });
  };

  // Placeholder functions for upload actions
  const handleUpload1 = async () => {
    const token = localStorage.getItem("token");
    const faceImage = sessionImages[currentSession]?.[0];
    const plateImage = sessionImages[currentSession]?.[1];
    const parkingLot = parkingLots[currentSession];

    if (!faceImage || !plateImage) {
      alert("Please select both face and license plate images.");
      return;
    }

    const formData = new FormData();
    formData.append("parking_lot_id", String(parkingLot.id));
    formData.append("face_image", faceImage);
    formData.append("plate_image", plateImage);

    try {
      const response = await axios.post(
        `${backendUrl}/history/upload_images/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful:", response.data);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed. Check console for details.");
    }
  };

  const handleUpload2 = () => {
    console.log("Upload to Backend 2");
    // Implement upload logic for Backend 2
  };

  return (
    <div className="userpage-container">
      <div className="session-bar">
        {parkingLots.map((_, idx) => (
          <button
            key={idx}
            className={currentSession === idx ? "active" : ""}
            onClick={() => setCurrentSession(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <div className="page-content">
        <div className="image-grid-labeled">
          <div className="column-labels">
            <div className="label">Gate-In</div>
            <div className="label">Gate-Out</div>
          </div>

          <div className="image-row">
            {/* Separate two ImageDropSquare columns */}
            <div className="image-column">
              <div className="image-cell">
                <div className="cell-title">Face Image</div>
                <ImageDropSquare
                  imageFile={sessionImages[currentSession]?.[0]}
                  onImageChange={(file) => handleImageChange(0, file)}
                />
              </div>
              <div className="image-cell">
                <div className="cell-title">License Plate Image</div>
                <ImageDropSquare
                  imageFile={sessionImages[currentSession]?.[1]}
                  onImageChange={(file) => handleImageChange(1, file)}
                />
              </div>
              <button className="upload-btn" onClick={handleUpload1}>
                Upload to Backend 1
              </button>
            </div>

            <div className="image-column">
              <div className="image-cell">
                <div className="cell-title">Face Image</div>
                <ImageDropSquare
                  imageFile={sessionImages[currentSession]?.[2]}
                  onImageChange={(file) => handleImageChange(2, file)}
                />
              </div>
              <div className="image-cell">
                <div className="cell-title">License Plate Image</div>
                <ImageDropSquare
                  imageFile={sessionImages[currentSession]?.[3]}
                  onImageChange={(file) => handleImageChange(3, file)}
                />
              </div>
              <button className="upload-btn" onClick={handleUpload2}>
                Upload to Backend 2
              </button>
            </div>
          </div>
        </div>

        <div className="info-panel">
          {parkingLots[currentSession] ? (
            <>
              <h2>{parkingLots[currentSession].name}</h2>
              <p>
                <strong>Location:</strong>{" "}
                {parkingLots[currentSession].location}
              </p>
              <p>
                <strong>Capacity:</strong>{" "}
                {parkingLots[currentSession].capacity}
              </p>
              <p>
                <strong>Available Spots:</strong>{" "}
                {parkingLots[currentSession].available_spots}
              </p>
              <p>
                <strong>ID:</strong> {parkingLots[currentSession].id}
              </p>
              <p>
                <strong>User ID:</strong> {parkingLots[currentSession].user_id}
              </p>
            </>
          ) : (
            <p>Loading session...</p>
          )}
        </div>
        <div className="history-list">
          <HistoryList parkingLotId={parkingLots[currentSession]?.id} />
        </div>
      </div>
    </div>
  );
}
