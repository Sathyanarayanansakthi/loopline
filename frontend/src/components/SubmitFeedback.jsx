import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { jsPDF } from "jspdf";

const SubmitFeedback = () => {
  const [team, setTeam] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [form, setForm] = useState({
    strengths: "",
    improvements: "",
    sentiment: "neutral",
    tags: "",
  });

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  useEffect(() => {
    axios
      .get("/team", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTeam(res.data))
      .catch(() => alert("Error loading team"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      employee_email: selectedEmployee,
      tags: form.tags.split(",").map(t => t.trim()),
    };

    try {
      await axios.post("/feedback", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Feedback submitted");
      setForm({ strengths: "", improvements: "", sentiment: "neutral", tags: "" });
    } catch {
      alert("Error submitting feedback");
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Manager Feedback`, 10, 10);
    doc.text(`Employee: ${selectedEmployee}`, 10, 20);
    doc.text(`Strengths: ${form.strengths}`, 10, 30);
    doc.text(`Improvements: ${form.improvements}`, 10, 40);
    doc.text(`Sentiment: ${form.sentiment}`, 10, 50);
    doc.text(`Tags: ${form.tags}`, 10, 60);
    doc.save("feedback.pdf");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        required
        className="w-full border p-2 rounded"
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
      >
        <option value="">Select Employee</option>
        {team.map((emp) => (
          <option key={emp.id} value={emp.email}>
            {emp.username} ({emp.email})
          </option>
        ))}
      </select>

      <textarea
        required
        placeholder="Strengths"
        className="w-full border p-2 rounded"
        value={form.strengths}
        onChange={(e) => setForm({ ...form, strengths: e.target.value })}
      />
      <textarea
        required
        placeholder="Improvements"
        className="w-full border p-2 rounded"
        value={form.improvements}
        onChange={(e) => setForm({ ...form, improvements: e.target.value })}
      />
      <select
        className="w-full border p-2 rounded"
        value={form.sentiment}
        onChange={(e) => setForm({ ...form, sentiment: e.target.value })}
      >
        <option value="positive">Positive</option>
        <option value="neutral">Neutral</option>
        <option value="negative">Negative</option>
      </select>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full border p-2 rounded"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />

      <div className="flex gap-4">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Submit Feedback
        </button>
        <button type="button" onClick={exportPDF} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Export as PDF
        </button>
      </div>
    </form>
  );
};

export default SubmitFeedback;
