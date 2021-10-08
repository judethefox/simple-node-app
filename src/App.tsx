import React, { useState, useEffect } from "react";
import "./App.css";
import { Booking } from "./types";
import { getNewBookingsFromText } from "./utils";

const apiUrl = "http://localhost:3001";

export const App = () => {
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [newBookings, setNewBookings] = useState<Booking[]>([]);

  const bookingsApiUrl = `${apiUrl}/bookings`;

  useEffect(() => {
    fetch(bookingsApiUrl)
      .then((response) => response.json())
      .then(setExistingBookings);
  }, []);

  const handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBookings),
    };
    fetch(bookingsApiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setExistingBookings(data);
        setNewBookings([]);
      });
  };

  const onDrop = (files: File[]) => {
    const csv = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;

      if (!text || typeof text !== "string") return;

      const newBookings = getNewBookingsFromText(text, existingBookings);
      setNewBookings(newBookings);
    };
    reader.readAsText(csv);
  };

  return (
    <div className="App">
      test
    </div>
  );
};
