import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddTeam = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [managerEmail, setManagerEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setManagerEmail(decoded.sub); // 'sub' is email
    } catch (err) {
      console.error("Token error", err);
      alert("Session expired. Please login again.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      role: "employee",
      manager_email: managerEmail,
    };

    try {
      await axios.post("/auth/register", payload);
      alert("Employee added to your team!");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Failed to add employee");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Add Team Member
        </h2>

        <input
          id="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-indigo-300"
        />

        <input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-indigo-300"
        />

        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-indigo-300"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Add to Team
        </button>
      </form>
    </div>
  );
};

export default AddTeam;
