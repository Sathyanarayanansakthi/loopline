import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { jsPDF } from "jspdf";

const SubmitFeedback = () => {
  const [employees, setEmployees] = useState([]);
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
      .get("/employees", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployees(res.data))
      .catch(() => alert("Error loading employees"));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      strengths: form.strengths,
      improvements: form.improvements,
      sentiment: form.sentiment,
      employee_email: selectedEmployee,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
    };

    try {
      await axios.post("/feedback", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Feedback submitted");
      setForm({ strengths: "", improvements: "", sentiment: "neutral", tags: "" });
      setSelectedEmployee("");
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Manager Feedback", 10, 10);
    doc.setFontSize(12);
    doc.text(`Employee: ${selectedEmployee}`, 10, 20);
    doc.text(`Strengths: ${form.strengths}`, 10, 30);
    doc.text(`Improvements: ${form.improvements}`, 10, 40);
    doc.text(`Sentiment: ${form.sentiment}`, 10, 50);
    doc.text(`Tags: ${form.tags}`, 10, 60);
    doc.save("feedback.pdf");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Select Employee</label>
          <select
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">-- Select Employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.email}>
                {emp.username} ({emp.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Strengths</label>
          <textarea
            required
            placeholder="E.g., Great leadership, proactive, etc."
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            value={form.strengths}
            onChange={(e) => setForm({ ...form, strengths: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Improvements</label>
          <textarea
            required
            placeholder="E.g., Needs improvement in documentation"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            value={form.improvements}
            onChange={(e) => setForm({ ...form, improvements: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Sentiment</label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            value={form.sentiment}
            onChange={(e) => setForm({ ...form, sentiment: e.target.value })}
          >
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Tags</label>
          <input
            type="text"
            placeholder="Tags (comma separated, e.g., teamwork, punctuality)"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={exportPDF}
            className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Export as PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitFeedback;