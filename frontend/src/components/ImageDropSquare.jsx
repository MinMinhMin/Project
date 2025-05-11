import React, { useRef } from "react";
import styles from "../styles/ImageDropSquare.module.css";

export default function ImageDropSquare({ imageFile, onImageChange }) {
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageChange(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageChange(file);
    }
  };

  return (
    <div
      className={styles.dropSquare}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current.click()}
    >
      {imageFile ? (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="preview"
          className={styles.previewImage}
        />
      ) : (
        <span>Drop or click</span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
