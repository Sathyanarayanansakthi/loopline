import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import FeedbackHistory from "../components/FeedbackHistory";
import SubmitFeedback from "../components/SubmitFeedback";

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
      {/* Sidebar */}
      <div className={`w-64 ${role === "manager" ? "bg-indigo-700" : "bg-blue-600"} text-white p-6 space-y-6`}>
        <h2 className="text-xl font-bold border-b pb-2">
          {role === "manager" ? "Manager Panel" : "Employee Panel"}
        </h2>
        <ul className="space-y-4">
          {role === "manager" && (
            <>
              <li className={`cursor-pointer hover:text-indigo-300 ${selectedTab === "employeeData" ? "font-semibold text-indigo-300" : ""}`} onClick={() => setSelectedTab("employeeData")}>Employee Data</li>
              <li className={`cursor-pointer hover:text-indigo-300 ${selectedTab === "employeeDetails" ? "font-semibold text-indigo-300" : ""}`} onClick={() => setSelectedTab("employeeDetails")}>Employee Details</li>
              <li className={`cursor-pointer hover:text-indigo-300 ${selectedTab === "addTeamMember" ? "font-semibold text-indigo-300" : ""}`} onClick={() => setSelectedTab("addTeamMember")}>Add Team Member</li>
              <li className={`cursor-pointer hover:text-indigo-300 ${selectedTab === "feedback" ? "font-semibold text-indigo-300" : ""}`} onClick={() => setSelectedTab("feedback")}>Submit Feedback</li>
            </>
          )}
          {role === "employee" && (
            <li className={`cursor-pointer hover:text-blue-300 ${selectedTab === "feedback" ? "font-semibold text-blue-300" : ""}`} onClick={() => setSelectedTab("feedback")}>Feedback Received</li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-10 bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome to the Dashboard</h1>

          {role === "manager" && !selectedTab && <p className="text-green-600 text-center font-medium">Manager has logged in</p>}
          {role === "employee" && !selectedTab && <p className="text-blue-600 text-center font-medium">Employee has logged in</p>}

          {selectedTab === "employeeData" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Employee Data</h2>
              <TeamTable team={team} />
            </div>
          )}

          {selectedTab === "employeeDetails" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
              <TeamTable team={team} showManager />
            </div>
          )}

          {selectedTab === "addTeamMember" && (
            <AddEmployeeForm setSelectedTab={setSelectedTab} />
          )}

          {selectedTab === "feedback" && role === "manager" && <SubmitFeedback />}
          {selectedTab === "feedback" && role === "employee" && <FeedbackHistory />}
        </div>
      </div>
    </div>
  );
};

const TeamTable = ({ team, showManager = false }) => (
  <>
    {team.length === 0 ? (
      <p>No employees found.</p>
    ) : (
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-indigo-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            {showManager && <th className="border px-4 py-2">Manager Email</th>}
          </tr>
        </thead>
        <tbody>
          {team.map((emp) => (
            <tr key={emp.id}>
              <td className="border px-4 py-2">{emp.id}</td>
              <td className="border px-4 py-2">{emp.username}</td>
              <td className="border px-4 py-2">{emp.email}</td>
              {showManager && <td className="border px-4 py-2">{emp.manager_email || "N/A"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </>
);

const AddEmployeeForm = ({ setSelectedTab }) => {
  const handleSubmit = async (e) => {
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="username" required placeholder="Username" className="w-full border px-4 py-2 rounded" />
      <input name="email" type="email" required placeholder="Email" className="w-full border px-4 py-2 rounded" />
      <input name="password" type="password" required placeholder="Password" className="w-full border px-4 py-2 rounded" />
      <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Add Employee</button>
    </form>
  );
};

export default Dashboard;