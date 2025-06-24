import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

const EmployeeFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  useEffect(() => {
    axios
      .get("/feedback/received", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFeedbackList(res.data))
      .catch(() => alert("Error loading feedback"));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
        Feedback Received from Managers
      </h2>

      {feedbackList.length === 0 ? (
        <p className="text-gray-500">No feedback received yet.</p>
      ) : (
        <div className="space-y-4">
          {feedbackList.map((item, idx) => (
            <div key={item.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
              <p><strong>Strengths:</strong> {item.strengths}</p>
              <p><strong>Improvements:</strong> {item.improvements}</p>
              <p><strong>Sentiment:</strong> <span className="capitalize">{item.sentiment}</span></p>
              <p><strong>Tags:</strong> {item.tags.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeFeedback;
