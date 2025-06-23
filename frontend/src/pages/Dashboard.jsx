import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } catch (err) {
      console.error("Invalid token", err);
      alert("Invalid token, please login again");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTeam = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/team", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeam(res.data);
      } catch (err) {
        console.error("Failed to fetch team", err);
        alert("Could not fetch employee data");
      }
    };

    if (selectedTab === "employeeData" || selectedTab === "employeeDetails") {
      fetchTeam();
    }
  }, [selectedTab]);

  return (
    <div className="flex min-h-screen">
      {role === "manager" && (
        <div className="w-64 bg-indigo-700 text-white p-6 space-y-6">
          <h2 className="text-xl font-bold border-b border-indigo-500 pb-2">Manager Panel</h2>
          <ul className="space-y-4">
            <li className={`cursor-pointer hover:text-indigo-300 ${selectedTab === "employeeData" ? "text-indigo-300 font-semibold" : ""}`} onClick={() => setSelectedTab("employeeData")}>Employee Data</li>
            <li className={`cursor-pointer hover:text-indigo-300 ${selectedTab === "employeeDetails" ? "text-indigo-300 font-semibold" : ""}`} onClick={() => setSelectedTab("employeeDetails")}>Employee Details</li>
            <li className={`cursor-pointer hover:text-indigo-300 ${selectedTab === "addTeamMember" ? "text-indigo-300 font-semibold" : ""}`} onClick={() => setSelectedTab("addTeamMember")}>Add Team Member</li>
          </ul>
        </div>
      )}

      {role === "employee" && (
        <div className="w-64 bg-blue-600 text-white p-6 space-y-6">
          <h2 className="text-xl font-bold border-b border-blue-400 pb-2">Employee Panel</h2>
          <ul className="space-y-4">
            <li className="hover:text-blue-200 cursor-pointer">Feedback Received</li>
          </ul>
        </div>
      )}

      <div className="flex-1 flex flex-col p-10 bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Welcome to the Dashboard
          </h1>

          {role === "manager" && !selectedTab && (
            <p className="text-green-600 font-medium text-center">Manager has logged in</p>
          )}

          {role === "employee" && (
            <p className="text-blue-600 font-medium text-center">Employee has logged in</p>
          )}

          {role === "manager" && selectedTab === "employeeData" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Employee Data</h2>
              {team.length === 0 ? (
                <p>No employees found.</p>
              ) : (
                <table className="w-full table-auto border">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border px-4 py-2">ID</th>
                      <th className="border px-4 py-2">Username</th>
                      <th className="border px-4 py-2">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((emp) => (
                      <tr key={emp.id}>
                        <td className="border px-4 py-2">{emp.id}</td>
                        <td className="border px-4 py-2">{emp.username}</td>
                        <td className="border px-4 py-2">{emp.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {role === "manager" && selectedTab === "employeeDetails" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
              {team.length === 0 ? (
                <p>No employees found.</p>
              ) : (
                <table className="w-full table-auto border">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border px-4 py-2">ID</th>
                      <th className="border px-4 py-2">Username</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Manager Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((emp) => (
                      <tr key={emp.id}>
                        <td className="border px-4 py-2">{emp.id}</td>
                        <td className="border px-4 py-2">{emp.username}</td>
                        <td className="border px-4 py-2">{emp.email}</td>
                        <td className="border px-4 py-2">{emp.manager_email || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {role === "manager" && selectedTab === "addTeamMember" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Add Team Member</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("token");
                  const decoded = jwtDecode(token);
                  try {
                    const payload = {
                      username: e.target.username.value,
                      email: e.target.email.value,
                      password: e.target.password.value,
                      role: "employee",
                      manager_email: decoded.sub,
                    };
                    await axios.post("/auth/register", payload);
                    alert("Employee added!");
                    e.target.reset();
                    setSelectedTab("employeeData");
                  } catch (err) {
                    alert("Failed to add employee");
                  }
                }}
                className="space-y-4"
              >
                <input
                  name="username"
                  required
                  placeholder="Username"
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                  className="w-full border px-4 py-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                >
                  Add Employee
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
