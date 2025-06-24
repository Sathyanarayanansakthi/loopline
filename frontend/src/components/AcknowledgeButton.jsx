import React from "react";
import axios from "../api/axios";

const AcknowledgeButton = ({ feedbackId, onAcknowledge }) => {
  const handleClick = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`/feedback/acknowledge/${feedbackId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onAcknowledge(feedbackId);
    } catch (err) {
      alert("Failed to acknowledge feedback");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
    >
      Acknowledge
    </button>
  );
};

export default AcknowledgeButton;
