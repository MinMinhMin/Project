import React from "react";
import "../../../styles/user/boxChecking.css";

const BoxChecking = ({
  imgFace1Path,
  imgFace2Path,
  imgPlate1Path,
  imgPlate2Path,
  isFace,
  isPlate,
  onRegret,
  onAccept, // New prop to handle closing
}) => {
  return (
    <div className="box-checking">
      <h2 className="box-title">So sánh ảnh mặt và biển số</h2>

      <div className="comparison-section">
        <h3>So sánh mặt</h3>
        {isFace ? (
          <>
            <div className="image-pair">
              <img src={imgFace1Path} alt="Vào" className="check-image" />
              <img src={imgFace2Path} alt="Ra" className="check-image" />
            </div>
            <div className="match-status matched">Mặt đã khớp</div>
          </>
        ) : (
          <>
            <div className="image-pair">
              <img src={imgFace1Path} alt="Vào" className="check-image" />
              <img src={imgFace2Path} alt="Ra" className="check-image" />
            </div>
            <div className="match-status not-matched"> Mặt không khớp</div>
          </>
        )}
      </div>

      <div className="comparison-section">
        <h3>So sánh biển số</h3>
        {isPlate ? (
          <>
            <div className="image-pair">
              <img src={imgPlate1Path} alt="Vào" className="check-image" />
              <img src={imgPlate2Path} alt="Ra" className="check-image" />
            </div>
            <div className="match-status matched"> Biển số đã khớp</div>
          </>
        ) : (
          <>
            <div className="image-pair">
              <img src={imgPlate1Path} alt="Vào" className="check-image" />
              <img src={imgPlate2Path} alt="Ra" className="check-image" />
            </div>
            <div className="match-status not-matched"> Biển số không khớp</div>
          </>
        )}
      </div>

      <div className="button-container">
        <button className="cancel-button" onClick={onRegret}>
          Hủy, thử lại
        </button>
        <button className="accept-button" onClick={onAccept}>
          {isFace && isPlate
            ? "Lưu vào lịch sử"
            : "Bỏ qua lỗi, lưu vào lịch sử "}
        </button>
      </div>
    </div>
  );
};

export default BoxChecking;
