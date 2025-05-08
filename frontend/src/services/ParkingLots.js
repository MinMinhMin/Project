import axios from "axios";
import { useEffect } from "react";

const backendUrl = import.meta.env.VITE_API_URL;

export function GetParkingLots({ setParkingLots }) {
  useEffect(() => {
    axios
      .get(`${backendUrl}/parking_lot/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setParkingLots(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching parking lots:", error);
      });
  }, []);
}

export function CreateParkingLot({ data, setParkingLots }) {
  axios
    .post(`${backendUrl}/parking_lot/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      setParkingLots((prev) => [...prev, response.data]);
    })
    .catch((error) => {
      console.error("Error creating parking lot:", error);
    });
}

export function UpdateParkingLot({ id, data, setParkingLots }) {
  axios.put(`${backendUrl}/parking_lot/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  setParkingLots((prev) =>
    prev.map((lot) => (lot.id === id ? { ...lot, ...data } : lot))
  );
}

export function DeleteParkingLot({ id, setParkingLots }) {
  try {
    axios.delete(`${backendUrl}/parking_lot/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setParkingLots((prev) => prev.filter((lot) => lot.id !== id));
  } catch (error) {
    console.error("Error deleting parking lot:", error);
    alert("Failed to delete parking lot.");
  }
}
