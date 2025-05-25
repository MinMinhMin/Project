import styles from "../../../styles/user/mainScreen.module.css";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import FaceCamera from "./FaceCamera";
import PlateCamera from "./PlateCamera";
import BoxChecking from "./boxChecking";
const backendUrl_AI = import.meta.env.VITE_API_URL_AI;
const backendUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const MainScreen = ({ ParkingLotId }) => {
  const [alert, setAlert] = useState(true);
  console.log(role);
  const [dropdownInOpen, setDropdownInOpen] = useState(false);
  const [dropdownOutOpen, setDropdownOutOpen] = useState(false);
  const [rotateIn, setRotateIn] = useState(0);
  const [rotateOut, setRotateOut] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [InId, setInId] = useState("None");
  const [DateIn, setDateIn] = useState(null);
  const [TimeIn, setTimeIn] = useState(null);
  const [plateNumberIn, setPlateNumberIn] = useState(null);
  const [faceEmbeddingIn, setFaceEmbeddingIn] = useState(null);
  const [in_face_img, setInFaceImg] = useState(null);
  const [in_plate_img, setInPlateImg] = useState(null);
  const [cameraMessageIn, setCameraMessageIn] = useState("");
  const [cameraStatusIn, setCameraStatusIn] = useState(false);
  const [ticketListIn, setTicketListIn] = useState([]);
  const faceVideoRef_In = useRef(null);
  const plateVideoRef_In = useRef(null);
  const faceCameraRef_In = useRef(null);
  const plateCameraRef_In = useRef(null);
  const [faceImgIn_path, setFaceImgIn_path] = useState(null);
  const [plateImgIn_path, setPlateImgIn_path] = useState(null);
  const [errorMessageIn, setErrorMessageIn] = useState(null);
  const [OutId, setOutId] = useState("None");
  const [DateOut, setDateOut] = useState(null);
  const [TimeOut, setTimeOut] = useState(null);
  const [plateNumberOut, setPlateNumberOut] = useState(null);
  const [faceEmbeddingOut, setFaceEmbeddingOut] = useState(null);
  const [out_face_img, setOutFaceImg] = useState(null);
  const [out_plate_img, setOutPlateImg] = useState(null);
  const [cameraMessageOut, setCameraMessageOut] = useState("");
  const [cameraStatusOut, setCameraStatusOut] = useState(false);
  const [ticketListOut, setTicketListOut] = useState([]);
  const faceVideoRef_Out = useRef(null);
  const plateVideoRef_Out = useRef(null);
  const faceCameraRef_Out = useRef(null);
  const plateCameraRef_Out = useRef(null);
  const [faceImgOut_path, setFaceImgOut_path] = useState(null);
  const [plateImgOut_path, setPlateImgOut_path] = useState(null);
  const [errorMessageOut, setErrorMessageOut] = useState(null);

  const [id, setId] = useState(null);
  function getVehicleTypeFromAIOutput(plate) {
    plate = plate.trim().toUpperCase();
    const parts = plate.split("-");
    if (parts.length !== 2) return "Không hợp lệ";
    const prefix = parts[0];
    const number = parts[1];
    if (!/^\d+[A-Z]+\d*$/.test(prefix) && !/^[A-Z]+\d+$/.test(prefix)) {
      return "Không hợp lệ";
    }
    if (prefix.length === 4) return "Xe máy";
    if (prefix.length === 3) return "Ô tô";
    if (number.length === 5) return "Ô tô";
    if (number.length === 4) return "Xe máy";
    return "Không xác định";
  }
  async function updateSpot(id, numberSpots) {
    try {
      const res = await axios.put(
        `${backendUrl}/parking_lot/update_spots/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            new_available_spots: numberSpots,
          },
        }
      );
      console.log("Update response:", res.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  }
  const fetchTicketListIn = async (id) => {
    try {
      console.log("Parking lot ID:", id);
      const response = await axios.get(
        `${backendUrl}/ticket/get_ticket_by_status`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            status: "Không Được Sử Dụng",
            parking_lot_id: id,
          },
        }
      );
      const tickets = response.data.tickets.map((ticket) => ticket.ticket_id);
      setTicketListIn(tickets);
      await updateSpot(ParkingLotId, tickets.length);
      console.log("Ticket List In:", response.data);
    } catch (error) {
      console.error("Error fetching ticket list In:", error);
    }
  };
  const fetchTicketListOut = async (id) => {
    try {
      console.log("Parking lot ID:", id);
      const response = await axios.get(
        `${backendUrl}/ticket/get_ticket_by_status`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { status: "Đang Được Sử Dụng", parking_lot_id: id },
        }
      );
      const tickets = response.data.tickets.map((ticket) => ticket.ticket_id);
      setTicketListOut(tickets);
      console.log("Ticket List Out:", response.data);
    } catch (error) {
      console.error("Error fetching ticket list Out:", error);
    }
  };
  useEffect(() => {
    if (!token || ParkingLotId) return;
    if (ParkingLotId) {
      console.log("Parking lot ID:", ParkingLotId);
      fetchTicketListIn(ParkingLotId);
      fetchTicketListOut(ParkingLotId);
    }
  }, [ParkingLotId, token]);
  function getCurrentTime() {
    const now = new Date();
    const time = now.toTimeString().split(" ")[0];
    return time;
  }
  function getCurrentDateInfo() {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    return date;
  }
  const refIn = useRef(null);
  const refOut = useRef(null);
  async function getPlateNumberFromImage(base64String, gate) {
    if (gate === "In") {
      setCameraMessageIn("Plate -> Number...");
    } else {
      setCameraMessageOut("Plate -> Number...");
    }
    const formData = new FormData();
    const byteString = atob(base64String.split(",")[1]);
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    formData.append("plate_image", blob, "snapshot.jpg");
    try {
      const response = await axios.post(
        `${backendUrl_AI}/AI/getPlateNumber`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response.data || response.data.license_plate === "unknown") {
        if (gate === "In") {
          setCameraMessageIn("Plate -> number failed, try again");
        } else {
          setCameraMessageOut("Plate -> number failed, try again");
        }

        throw new Error("Empty response");
      }
      console.log("Plate number response:", response.data);
      return response.data.license_plate;
    } catch (error) {
      if (gate === "In") {
        setCameraMessageIn("Plate -> number failed, try again");
      } else {
        setCameraMessageOut("Plate -> number failed, try again");
      }

      console.error("Error recognizing plate:", error);
      throw error;
    }
  }
  async function getFaceEmbedding(base64String, gate) {
    if (gate === "In") {
      setCameraMessageIn("Face -> Embedding...");
    } else {
      setCameraMessageOut("Face -> Embedding...");
    }
    const formData = new FormData();
    const byteString = atob(base64String.split(",")[1]);
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    formData.append("face_image", blob, "snapshot.jpg");
    try {
      const response = await axios.post(
        `${backendUrl_AI}/AI/getFaceEmbedding`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.embedding.length === 0) {
        if (gate === "In") {
          setCameraMessageIn("Face -> embedding failed, try again");
        } else {
          setCameraMessageOut("Face -> embedding failed, try again");
        }
        throw new Error("Empty embedding");
      }
      if (gate === "In") {
        console.log("Face embedding In:", response.data.embedding);
      } else {
        console.log("Face embedding Out:", response.data.embedding);
      }

      return response.data.embedding;
    } catch (error) {
      if (gate === "In") {
        setCameraMessageIn("Face -> embedding failed, try again");
      } else {
        setCameraMessageOut("Face -> embedding failed, try again");
      }
      console.error("Error recognizing face:", error);
      throw error;
    }
  }
  async function uploadBase64ToImgBB(base64Image, gate) {
    if (gate === "In") {
      setCameraMessageIn("Uploading to Imgbb...");
    } else {
      setCameraMessageOut("Uploading to Imgbb...");
    }
    const cleanBase64 = base64Image.split(",")[1];
    try {
      const response = await axios.post(
        `${backendUrl}/history/upload_to_imgbb`,
        {
          image: cleanBase64,
        }
      );
      console.log("Imgbb response:", response.data);
      return response.data.link;
    } catch (error) {
      if (gate === "In") {
        setCameraMessageIn("Upload to Imgbb failed, try again");
      } else {
        setCameraMessageOut("Upload to Imgbb failed, try again");
      }

      console.error("Error when uploading to Imgbb:", error);
      throw error;
    }
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (refIn.current && !refIn.current.contains(event.target)) {
        setDropdownInOpen(false);
        setRotateIn(0);
      }
      if (refOut.current && !refOut.current.contains(event.target)) {
        setDropdownOutOpen(false);
        setRotateOut(0);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const createHistory_In = async (
    face_image_path_IN,
    license_plate_image_path_IN,
    face_embedding_IN,
    license_plate_IN,
    face_image_path_OUT,
    license_plate_image_path_OUT,
    face_embedding_OUT,
    license_plate_OUT,
    date_in,
    date_out,
    time_in,
    time_out,
    ticket_id,
    ticket_type,
    vehicle_type,
    parking_lot_id
  ) => {
    setCameraMessageIn("Creating history...");
    const payload = {
      face_image_path_IN: face_image_path_IN,
      license_plate_image_path_IN: license_plate_image_path_IN,
      face_embedding_IN: face_embedding_IN,
      license_plate_IN: license_plate_IN,
      face_image_path_OUT: face_image_path_OUT,
      license_plate_image_path_OUT: license_plate_image_path_OUT,
      face_embedding_OUT: face_embedding_OUT,
      license_plate_OUT: license_plate_OUT,
      date_in: date_in,
      date_out: date_out,
      time_in: time_in,
      time_out: time_out,
      ticket_id: ticket_id,
      ticket_type: ticket_type,
      vehicle_type: vehicle_type,
      parking_lot_id: parking_lot_id,
    };
    try {
      const res = await axios.post(`${backendUrl}/history/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setCameraMessageIn("Create history failed, try again");
      console.error("API Error:", err);
    }
  };
  async function getHistoryIn(parking_lot_id, ticket_id, license_plate) {
    setCameraMessageOut("Getting history...");
    try {
      const res = await axios.get(`${backendUrl}/history/search/last`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          parking_lot_id: parking_lot_id,
          ticket_id: ticket_id,
          license_plate: license_plate,
        },
      });
      console.log("Get history response:", res.data);
      return res.data;
    } catch (err) {
      setCameraMessageOut("No history found, try again");
      console.error("API Error:", err);
    }
  }
  async function updateHistoryOut(
    id,
    face_image_path_OUT,
    license_plate_image_path_OUT,
    face_embedding_OUT,
    license_plate_OUT,
    date_out,
    time_out
  ) {
    setCameraMessageOut("Updating history...");
    try {
      const res = await axios.put(
        `${backendUrl}/history/update/${id}`,
        {
          face_image_path_OUT: face_image_path_OUT,
          license_plate_image_path_OUT: license_plate_image_path_OUT,
          face_embedding_OUT: face_embedding_OUT,
          license_plate_OUT: license_plate_OUT,
          date_out: date_out,
          time_out: time_out,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      setCameraMessageOut("Update history failed, try again");
      console.error("API Error:", err.response?.data || err.message);
    }
  }
  async function updateTicketStatus(parking_lot_id, ticket_id, status) {
    console.log("Parking lot ID:", parking_lot_id);
    console.log("Ticket ID:", ticket_id);
    console.log("Status:", status);
    try {
      const res = await axios.put(
        `${backendUrl}/ticket/update_ticket_status/`,
        {
          parking_lot_id: parking_lot_id,
          ticket_id: ticket_id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  }
  const selectInId = (id) => {
    console.log("Selected in ID:", id);
    setDropdownInOpen(false);
    setInId(id);
    setRotateIn(0);
  };
  const selectOutId = (id) => {
    console.log("Selected out ID:", id);
    setDropdownOutOpen(false);
    setOutId(id);
    setRotateOut(0);
  };
  const toggleDropdownIn = () => {
    fetchTicketListIn(ParkingLotId);
    setDropdownInOpen(!dropdownInOpen);
    setRotateIn(dropdownInOpen ? 0 : 180);
  };
  const toggleDropdownOut = () => {
    fetchTicketListOut(ParkingLotId);
    setDropdownOutOpen(!dropdownOutOpen);
    setRotateOut(dropdownOutOpen ? 0 : 180);
  };
  useEffect(() => {
    const startCamera = (cameraRef, deviceIndex) => {
      cameraRef.current?.startStream?.(deviceIndex);
    };
    const stopCamera = (cameraRef) => {
      cameraRef.current?.stopStream?.();
    };
    if (cameraStatusIn) {
      startCamera(faceCameraRef_In, 1);
      startCamera(plateCameraRef_In, 0);
    } else {
      stopCamera(faceCameraRef_In);
      stopCamera(plateCameraRef_In);
    }
    if (cameraStatusOut) {
      startCamera(faceCameraRef_Out, 1);
      startCamera(plateCameraRef_Out, 0);
    } else {
      stopCamera(faceCameraRef_Out);
      stopCamera(plateCameraRef_Out);
    }
    return () => {
      [
        faceCameraRef_In,
        plateCameraRef_In,
        faceCameraRef_Out,
        plateCameraRef_Out,
      ].forEach((ref) => stopCamera(ref));
    };
  }, [cameraStatusIn, cameraStatusOut]);

  async function compareFaceEmbedding(embedding1, embedding2) {
    try {
      const response = await axios.post(
        `${backendUrl_AI}/AI/compareFace`,
        {
          embedding1: embedding1,
          embedding2: embedding2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.is_match;
    } catch (error) {
      console.error("Error comparing face embeddings:", error);
      return false;
    }
  }

  const [isMatchFace, setIsMatchFace] = useState(false);
  const [isMatchPlate, setIsMatchPlate] = useState(false);

  const processInGate = async (faceImg, plateImg) => {
    if (InId === "None") {
      setCameraMessageIn("Please select a ticket ID");
      return;
    }
    const timeIn = getCurrentTime();
    const dateIn = getCurrentDateInfo();
    const faceUrl = await uploadBase64ToImgBB(faceImg, "In");
    const plateUrl = await uploadBase64ToImgBB(plateImg, "In");
    const plateNumber = await getPlateNumberFromImage(plateImg, "In");
    const faceEmbedding = await getFaceEmbedding(faceImg, "In");
    const updateTicket = await updateTicketStatus(
      ParkingLotId,
      InId,
      "Đang Được Sử Dụng"
    );
    setTimeIn(timeIn);
    setDateIn(dateIn);
    setFaceImgIn_path(faceUrl);
    setPlateImgIn_path(plateUrl);
    setPlateNumberIn(plateNumber);
    setFaceEmbeddingIn(faceEmbedding);
    createHistory_In(
      faceUrl,
      plateUrl,
      faceEmbedding,
      plateNumber,
      null,
      null,
      null,
      null,
      dateIn,
      null,
      timeIn,
      null,
      InId,
      "Vé lượt",
      getVehicleTypeFromAIOutput(plateNumber),
      ParkingLotId
    );
    console.log("Face URL:", faceUrl);
    console.log("Plate URL:", plateUrl);
    console.log("Plate Number:", plateNumber);
    console.log("Face Embedding:", faceEmbedding);
    console.log("Update Ticket:", updateTicket);
    fetchTicketListIn(ParkingLotId);
    setInId("None");
    setCameraMessageIn("Done");
  };
  const processOutGate = async (faceImg, plateImg) => {
    if (OutId === "None") {
      setCameraMessageOut("Please select a ticket ID");
      return;
    }
    const timeOut = getCurrentTime();
    const dateOut = getCurrentDateInfo();
    const faceUrl = await uploadBase64ToImgBB(faceImg, "Out");
    const plateUrl = await uploadBase64ToImgBB(plateImg, "Out");
    const plateNumber = await getPlateNumberFromImage(plateImg, "Out");
    const faceEmbedding = await getFaceEmbedding(faceImg, "Out");

    setTimeOut(timeOut);
    setDateOut(dateOut);
    setFaceImgOut_path(faceUrl);
    setPlateImgOut_path(plateUrl);
    setPlateNumberOut(plateNumber);
    setFaceEmbeddingOut(faceEmbedding);
    const getRespond = await getHistoryIn(ParkingLotId, OutId, plateNumber);
    const faceEmbeddingDB_IN = getRespond.face_embedding_IN;
    const plateNumberDB_IN = getRespond.license_plate_IN;
    setFaceImgIn_path(getRespond.face_image_path_IN);
    setPlateImgIn_path(getRespond.license_plate_image_path_IN);

    console.log("Face URL:", faceUrl);
    console.log("Plate URL:", plateUrl);
    console.log("Plate Number:", plateNumber);
    console.log("Face Embedding:", faceEmbedding);
    console.log("Get Respond:", getRespond);
    if (getRespond) {
      console.log("Face Embedding In:", faceEmbeddingDB_IN);
      console.log("Face Embedding Out:", faceEmbedding);
      console.log("Plate Number In:", plateNumberDB_IN);
      console.log("Plate Number Out:", plateNumber);

      const check = await compareFaceEmbedding(
        faceEmbeddingDB_IN,
        faceEmbedding
      );
      console.log("Face check:", check);
      console.log("Plate check:", plateNumberDB_IN === plateNumber);
      setIsMatchFace(check);
      setIsMatchPlate(plateNumberDB_IN === plateNumber);

      const id = getRespond.id;
      setId(id);
    } else {
      setCameraMessageOut("No history found, try again");
    }
  };
  const in_button_handle = async () => {
    setCameraMessageIn("Capturing...");
    setTimeout(async () => {
      if (faceVideoRef_In.current && plateVideoRef_In.current) {
        const faceImg = faceCameraRef_In.current.takeSnapshot();
        const plateImg = plateCameraRef_In.current.takeSnapshot();
        if (faceImg && plateImg) {
          setInFaceImg(faceImg);
          setInPlateImg(plateImg);
          setTimeIn(getCurrentTime());
          setDateIn(getCurrentDateInfo());
          try {
            await processInGate(faceImg, plateImg);
            console.log("Captured face and plate images");
          } catch (err) {
            console.error("Error during processInGate:", err);
          }
        } else {
          setCameraMessageIn("Vehicle moving, try again");
          console.log("Failed to capture images");
        }
      }
    }, 2000);
  };
  const out_button_handle = async () => {
    setCameraMessageOut("Capturing...");
    setTimeout(async () => {
      if (faceVideoRef_Out.current && plateVideoRef_Out.current) {
        const faceImg = faceCameraRef_Out.current.takeSnapshot();
        const plateImg = plateCameraRef_Out.current.takeSnapshot();
        if (faceImg && plateImg) {
          setOutFaceImg(faceImg);
          setOutPlateImg(plateImg);
          try {
            await processOutGate(faceImg, plateImg);
            if (OutId !== "None") {
              setShowBox(true);
            }

            console.log("Captured face and plate images");
          } catch (err) {
            setAlert(true);
            console.error("Error during processOutGate:", err);
          }
        } else {
          setAlert(true);
          setCameraMessageOut("Vehicle moving, try again");
          console.log("Failed to capture images");
        }
      }
    }, 2000);
  };
  const cameraInHandle = () => {
    setCameraStatusIn(!cameraStatusIn);
  };
  const cameraOutHandle = () => {
    setCameraStatusOut(!cameraStatusOut);
  };
  const handleCloseBox_Regret = () => {
    setAlert(true);
    setShowBox(false);
  };
  const handleCloseBox_Accept = async () => {
    console.log("id:", id);
    console.log("faceImgOut_path:", faceImgOut_path);
    console.log("plateImgOut_path:", plateImgOut_path);
    console.log("faceEmbeddingOut:", faceEmbeddingOut);
    console.log("plateNumberOut:", plateNumberOut);
    console.log("DateOut:", DateOut);
    console.log("TimeOut:", TimeOut);

    const updateRespond = await updateHistoryOut(
      id,
      faceImgOut_path,
      plateImgOut_path,
      faceEmbeddingOut,
      plateNumberOut,
      DateOut,
      TimeOut
    );
    console.log("Update Respond:", updateRespond);
    fetchTicketListOut(ParkingLotId);
    setOutId("None");
    setCameraMessageOut("Done");

    const updateTicket = await updateTicketStatus(
      ParkingLotId,
      OutId,
      "Không Được Sử Dụng"
    );
    console.log("Update Ticket:", updateTicket);
    setAlert(false);
    setShowBox(false);
  };
  return (
    <>
      <div
        className={`${styles["main-content"]} ${showBox ? styles.blurred : ""}`}
      >
        <div className={styles.container}>
          <div className={styles["cam-and-info"]}>
            <div className={styles["front-side"]}>
              <div className={styles["choose-bar"]}>
                <p>Làn vào</p>
                <div className={styles["container-id-scan"]}>
                  <div className={styles["container-id"]} ref={refIn}>
                    ID thẻ
                    <button className={styles["id"]} onClick={toggleDropdownIn}>
                      {InId}
                      <img
                        src="/assets/dropdown.svg"
                        alt="dropdown"
                        style={{ transform: `rotate(${rotateIn}deg)` }}
                      />
                    </button>
                    {dropdownInOpen && (
                      <ul className={styles["dropdown-list"]}>
                        {ticketListIn.map((id) => (
                          <li
                            key={id}
                            className={styles["dropdown-item"]}
                            onClick={() => selectInId(id)}
                          >
                            {id}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={styles["container-scan"]}>
                    Quẹt thẻ
                    <button
                      className={styles["scan"]}
                      onClick={in_button_handle}
                    >
                      <img src="/assets/scan2.svg" alt="scan" />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles["container-video-cam"]}>
                <div className={styles["container-button"]}>
                  <p>Video Cam</p>
                  <button
                    className={styles["cam-controller"]}
                    onClick={cameraInHandle}
                  >
                    Turn on/off
                  </button>
                  <div className={styles["cam-message"]}>{cameraMessageIn}</div>
                </div>
                <div className={styles["content-cam"]}>
                  <div
                    className={`${styles["in-video-back"]} ${styles["cam"]}`}
                  >
                    <p>Mặt sau</p>
                    <PlateCamera
                      videoRef={plateVideoRef_In}
                      ref={plateCameraRef_In}
                    />
                  </div>
                  <div
                    className={`${styles["in-video-front"]} ${styles["cam"]}`}
                  >
                    <p>Mặt trước</p>
                    <FaceCamera
                      videoRef={faceVideoRef_In}
                      ref={faceCameraRef_In}
                    />
                  </div>
                </div>
              </div>
              <div className={styles["container-picture"]}>
                <p>Ảnh chụp</p>
                <div className={styles["content-cam"]}>
                  <div
                    className={`${styles["in-picture-back"]} ${styles["cam"]}`}
                  >
                    <p>Mặt sau</p>
                    <img src={in_plate_img} />
                  </div>
                  <div
                    className={`${styles["in-picture-front"]} ${styles["cam"]}`}
                  >
                    <p>Mặt trước</p>
                    <img src={in_face_img} />
                  </div>
                </div>
              </div>
              <div className={styles["container-info"]}>
                <div className={styles["text-info"]}>
                  <div className={styles["day-in"]}>
                    <span>Ngày vào</span>
                    {DateIn || "00/00/00"}
                  </div>
                  <div className={styles["hori-line"]}></div>
                  <div className={styles["time-in"]}>
                    <span>Giờ vào</span>
                    {TimeIn || "00:00:00"}
                  </div>
                  <div className={styles["hori-line"]}></div>
                  <div className={styles["plate"]}>
                    <span>Biển số xe vào</span>
                    <p>{plateNumberIn || "***********"}</p>
                  </div>
                </div>
                <div className={styles["img-info"]}>
                  <div className={styles["img-face"]}>
                    <p>Ảnh mặt</p>
                    <img src={in_face_img} />
                  </div>
                  <div className={styles["img-plate"]}>
                    <p>Ảnh biển</p>
                    <img src={in_plate_img} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["vertical-line"]}></div>
            <div className={styles["back-side"]}>
              <div className={styles["choose-bar"]}>
                <p>Làn Ra</p>
                <div className={styles["container-id-scan"]}>
                  <div className={styles["container-id"]} ref={refOut}>
                    ID thẻ
                    <button
                      className={styles["id"]}
                      onClick={toggleDropdownOut}
                    >
                      {OutId}
                      <img
                        src="/assets/dropdown.svg"
                        alt="dropdown"
                        style={{ transform: `rotate(${rotateOut}deg)` }}
                      />
                    </button>
                    {dropdownOutOpen && (
                      <ul className={styles["dropdown-list"]}>
                        {ticketListOut.map((id) => (
                          <li
                            key={id}
                            className={styles["dropdown-item"]}
                            onClick={() => selectOutId(id)}
                          >
                            {id}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={styles["container-scan"]}>
                    <span>Quẹt thẻ</span>
                    <button className={styles.scan} onClick={out_button_handle}>
                      <img src="/assets/scan2.svg" alt="scan" />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles["container-video-cam"]}>
                <div className={styles["container-button"]}>
                  <p>Video Cam</p>
                  <button
                    className={styles["cam-controller"]}
                    onClick={cameraOutHandle}
                  >
                    Turn on/off
                  </button>
                  <div className={styles["cam-message"]}>
                    {cameraMessageOut}
                  </div>
                </div>
                <div className={styles["content-cam"]}>
                  <div
                    className={`${styles["in-video-back"]} ${styles["cam"]}`}
                  >
                    <p>Mặt sau</p>
                    <PlateCamera
                      videoRef={plateVideoRef_Out}
                      ref={plateCameraRef_Out}
                    />
                  </div>
                  <div
                    className={`${styles["in-video-front"]} ${styles["cam"]}`}
                  >
                    <p>Mặt trước</p>
                    <FaceCamera
                      videoRef={faceVideoRef_Out}
                      ref={faceCameraRef_Out}
                    />
                  </div>
                </div>
              </div>
              <div className={styles["container-picture"]}>
                <p>Ảnh chụp</p>
                <div className={styles["content-cam"]}>
                  <div
                    className={`${styles["in-picture-back"]} ${styles["cam"]}`}
                  >
                    <p>Mặt sau</p>
                    <div className={styles["content"]}>
                      <img src={out_plate_img} />
                    </div>
                  </div>
                  <div
                    className={`${styles["in-picture-front"]} ${styles["cam"]}`}
                  >
                    <p>Mặt trước</p>
                    <img src={out_face_img} />
                  </div>
                </div>
              </div>
              <div className={styles["container-info"]}>
                <div className={styles["text-info"]}>
                  <div className={styles["day-in"]}>
                    <span>Ngày ra</span>
                    {DateOut || "00/00/00"}
                  </div>
                  <div className={styles["hori-line"]}></div>
                  <div className={styles["time-in"]}>
                    <span>Giờ ra</span>
                    {TimeOut || "00:00:00"}
                  </div>
                  <div className={styles["hori-line"]}></div>
                  <div className={styles["plate"]}>
                    <span>Biển số xe ra</span>
                    <p>{plateNumberOut || "***********"}</p>
                  </div>
                </div>
                <div className={styles["img-info"]}>
                  <div className={styles["img-face"]}>
                    <p>Ảnh mặt</p>
                    {out_face_img ? <img src={out_face_img} /> : ""}
                  </div>
                  <div className={styles["img-plate"]}>
                    <p>Ảnh biển</p>
                    {out_plate_img ? <img src={out_plate_img} /> : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {alert ? (
            <div className={styles["status-bad"]}>{"Chưa xác thực"}</div>
          ) : (
            <div className={styles["status-good"]}>{"Mời xe ra"}</div>
          )}
        </div>
      </div>
      {showBox && (
        <div className={styles.boxOverlay}>
          <BoxChecking
            imgFace1Path={faceImgIn_path}
            imgFace2Path={faceImgOut_path}
            imgPlate1Path={plateImgIn_path}
            imgPlate2Path={plateImgOut_path}
            isFace={isMatchFace}
            isPlate={isMatchPlate}
            onRegret={handleCloseBox_Regret}
            onAccept={handleCloseBox_Accept} // New prop to handle closing
          />
        </div>
      )}
    </>
  );
};
export default MainScreen;
