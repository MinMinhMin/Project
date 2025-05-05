import React, { useState } from "react";
import ListImages from "../components/UnSavedFaceImages";
import styles from "../styles/UnSavedFaceImagesBox.module.css";
import axios from "axios";

const UnSavedImagesBox = ({ images, setImages }) => {
  const [open, setOpen] = useState(false);
  const backendUrl = import.meta.env.VITE_API_URL;

  const handleSave = async (index) => {
    const image = images[index];
    const base64 = image.dataUrl.split(",")[1];

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to save images.");
        return;
      }

      const byteCharacters = atob(base64);
      const byteNumbers = Array.from(byteCharacters).map((c) =>
        c.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      const formData = new FormData();
      formData.append("file", blob, "snapshot.png");

      await axios.post(`${backendUrl}/face_images/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setImages((prev) =>
        prev.map((img, i) => (i === index ? { ...img, saved: true } : img))
      );
    } catch (err) {
      alert("Failed to upload image.");
      console.error(err);
    }
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const unsavedImages = images.filter((img) => !img.saved);

  return (
    <>
      <button className={styles.floatingButton} onClick={() => setOpen(true)}>
        Unsaved ({unsavedImages.length})
      </button>

      {open && (
        <>
          <div className={styles.backdrop} onClick={() => setOpen(false)} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Unsaved Face Images</h2>
              <button onClick={() => setOpen(false)}>✖</button>
            </div>
            <ListImages
              images={unsavedImages}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}
    </>
  );
};

export default UnSavedImagesBox;
