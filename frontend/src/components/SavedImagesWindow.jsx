import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/SavedImagesWindow.module.css";

const backendUrl = import.meta.env.VITE_API_URL;

const SavedImagesWindow = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (showWindow) {
      axios
        .get(`${backendUrl}/face_images/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setImages(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching saved images:", error);
        });
    }
  }, [showWindow]);
  console.log(images);
  return (
    <>
      <div onClick={() => setShowWindow(true)} className={styles.trigger}>
        Saved Images
      </div>

      {showWindow && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setShowWindow(false)}
          />

          <div className={styles.modal}>
            <h3>Saved Images</h3>
            <div className={styles.imageGrid}>
              {images.length > 0 ? (
                images.map((img, index) => (
                  <img
                    key={index}
                    src={img.image_url}
                    alt={`Saved ${index}`}
                    className={styles.image}
                  />
                ))
              ) : (
                <p>No saved images found.</p>
              )}
            </div>
            <button
              onClick={() => setShowWindow(false)}
              className={styles.closeButton}
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SavedImagesWindow;
