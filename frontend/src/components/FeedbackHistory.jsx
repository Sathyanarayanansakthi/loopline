import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
import AcknowledgeButton from "./AcknowledgeButton";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const FeedbackHistory = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    setRole(decoded.role);

    const endpoint = decoded.role === "manager" ? "/feedback/team" : "/feedback/received";

    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFeedbacks(res.data))
      .catch(() => alert("Failed to load feedback"));
  }, []);

  const handleAcknowledge = (id) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, acknowledged: true } : f))
    );
  };

  const generatePdfFromElement = async (element, filename) => {
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save(filename);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF");
    }
  };

  const downloadPdf = async (fb) => {
    const printableDiv = document.createElement("div");
    printableDiv.style.padding = "20px";
    printableDiv.style.fontFamily = "Arial";
    printableDiv.innerHTML = `
      <h2>Feedback for ${fb.employee_email}</h2>
      <p><strong>Manager:</strong> ${fb.manager_email}</p>
      <p><strong>Sentiment:</strong> ${fb.sentiment}</p>
      <p><strong>Strengths:</strong> ${fb.strengths}</p>
      <p><strong>Improvements:</strong> ${fb.improvements}</p>
      <p><strong>Acknowledged:</strong> ${fb.acknowledged ? "Yes" : "No"}</p>
    `;

    document.body.appendChild(printableDiv);
    await generatePdfFromElement(printableDiv, `feedback-${fb.employee_email}.pdf`);
    document.body.removeChild(printableDiv);
  };

  const downloadAllFeedbacks = async () => {
    const printableDiv = document.createElement("div");
    printableDiv.style.padding = "20px";
    printableDiv.style.fontFamily = "Arial";

    printableDiv.innerHTML = `<h2>All Feedbacks</h2>`;
    feedbacks.forEach((fb) => {
      printableDiv.innerHTML += `
        <hr/>
        <p><strong>Employee:</strong> ${fb.employee_email}</p>
        <p><strong>Manager:</strong> ${fb.manager_email}</p>
        <p><strong>Sentiment:</strong> ${fb.sentiment}</p>
        <p><strong>Strengths:</strong> ${fb.strengths}</p>
        <p><strong>Improvements:</strong> ${fb.improvements}</p>
        <p><strong>Acknowledged:</strong> ${fb.acknowledged ? "Yes" : "No"}</p>
      `;
    });

    document.body.appendChild(printableDiv);
    await generatePdfFromElement(printableDiv, "all-feedbacks.pdf");
    document.body.removeChild(printableDiv);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Feedback History</h2>

        {feedbacks.length > 0 && (
          <button
            onClick={downloadAllFeedbacks}
            className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm shadow"
          >
            Download All as PDF
          </button>
        )}
      </div>

      {feedbacks.length === 0 && (
        <p className="text-gray-600 text-sm">No feedback available.</p>
      )}

      {feedbacks.map((fb) => (
        <div
          key={fb.id}
          className="border border-gray-200 rounded-xl p-6 shadow bg-white"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
            <p><strong>Employee:</strong> {fb.employee_email}</p>
            <p><strong>Manager:</strong> {fb.manager_email}</p>
            <p><strong>Sentiment:</strong> {fb.sentiment}</p>
            <p><strong>Strengths:</strong> {fb.strengths}</p>
            <p><strong>Improvements:</strong> {fb.improvements}</p>
            <p><strong>Acknowledged:</strong> {fb.acknowledged ? "Yes" : "No"}</p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {role === "employee" && !fb.acknowledged && (
              <AcknowledgeButton feedbackId={fb.id} onAcknowledge={handleAcknowledge} />
            )}

            <button
              onClick={() => downloadPdf(fb)}
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm shadow"
            >
              Download as PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackHistory;
