import React, { useState } from "react";
import styles from "../styles/UnSavedFaceImages.module.css";

const ListImages = ({ images, onSave, onDelete }) => {
  const [modalImage, setModalImage] = useState(null);

  return (
    <div>
      <div className={styles.listContainer}>
        {images.map((img, idx) => (
          <div key={idx} className={styles.imageCard}>
            <img
              src={img.dataUrl}
              alt={`snapshot-${idx}`}
              onClick={() => setModalImage(img.dataUrl)}
              className={styles.clickable}
            />
            {img.timestamp && (
              <div className={styles.timestamp}>
                {new Date(img.timestamp).toLocaleString()}
              </div>
            )}
            <div className={styles.buttonGroup}>
              {!img.saved ? (
                <>
                  <button onClick={() => onSave(idx)}>Save</button>
                  <button onClick={() => onDelete(idx)}>Remove</button>
                </>
              ) : (
                <span className={styles.savedLabel}>Saved</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalImage && (
        <div className={styles.modal} onClick={() => setModalImage(null)}>
          <img src={modalImage} className={styles.modalImg} />
        </div>
      )}
    </div>
  );
};

export default ListImages;
