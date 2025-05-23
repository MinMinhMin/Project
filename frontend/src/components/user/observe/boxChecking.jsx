import React from "react";
import "../../../styles/user/boxChecking.css";

const BoxChecking = ({
  imgFace1Path,
  imgFace2Path,
  imgPlate1Path,
  imgPlate2Path,
  isFace,
  isPlate,
  onClose, // New prop to handle closing
}) => {
  return (
    <div className="box-checking">
      <h2 className="box-title">Comparison Result</h2>

      <div className="comparison-section">
        <h3>Face Comparison</h3>
        {isFace ? (
          <>
            <div className="image-pair">
              <img src={imgFace1Path} alt="Face 1" className="check-image" />
              <img src={imgFace2Path} alt="Face 2" className="check-image" />
            </div>
            <div className="match-status matched"> Face Matched</div>
          </>
        ) : (
          <>
            <div className="image-pair">
              <img src={imgFace1Path} alt="Face 1" className="check-image" />
              <img src={imgFace2Path} alt="Face 2" className="check-image" />
            </div>
            <div className="match-status not-matched"> Face not Matched</div>
          </>
        )}
      </div>

      <div className="comparison-section">
        <h3>Plate Comparison</h3>
        {isPlate ? (
          <>
            <div className="image-pair">
              <img src={imgPlate1Path} alt="Plate 1" className="check-image" />
              <img src={imgPlate2Path} alt="Plate 2" className="check-image" />
            </div>
            <div className="match-status matched"> Plate Matched</div>
          </>
        ) : (
          <>
            <div className="image-pair">
              <img src={imgPlate1Path} alt="Plate 1" className="check-image" />
              <img src={imgPlate2Path} alt="Plate 2" className="check-image" />
            </div>
            <div className="match-status not-matched"> Plate not matched</div>
          </>
        )}
      </div>

      <div className="button-container">
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button className="accept-button" onClick={onClose}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default BoxChecking;
