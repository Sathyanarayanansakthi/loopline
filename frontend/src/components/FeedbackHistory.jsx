import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
import AcknowledgeButton from "./AcknowledgeButton";

const FeedbackHistory = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setRole(decoded.role);

    const endpoint = decoded.role === "manager" ? "/feedback/team" : "/feedback/received";

    axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setFeedbacks(res.data))
    .catch(() => alert("Failed to load feedback"));
  }, []);

  const handleAcknowledge = (id) => {
    setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, acknowledged: true } : f));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Feedback History</h2>
      {feedbacks.map(fb => (
        <div key={fb.id} className="border p-4 rounded bg-white shadow">
          <p><strong>Employee:</strong> {fb.employee_email}</p>
          <p><strong>Manager:</strong> {fb.manager_email}</p>
          <p><strong>Sentiment:</strong> {fb.sentiment}</p>
          <p><strong>Strengths:</strong> {fb.strengths}</p>
          <p><strong>Improvements:</strong> {fb.improvements}</p>
          <p><strong>Acknowledged:</strong> {fb.acknowledged ? "✅" : "❌"}</p>
          {role === "employee" && !fb.acknowledged && (
            <AcknowledgeButton feedbackId={fb.id} onAcknowledge={handleAcknowledge} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedbackHistory;
