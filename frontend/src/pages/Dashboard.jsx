import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import FeedbackHistory from "../components/FeedbackHistory";
import SubmitFeedback from "../components/SubmitFeedback";
import { FaUserPlus, FaUsers, FaCommentDots, FaUserTie } from "react-icons/fa";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } catch (err) {
      console.error("Invalid token", err);
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
      }
    };

    if (selectedTab === "employeeData" || selectedTab === "employeeDetails") {
      fetchTeam();
    }
  }, [selectedTab]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-72 p-6 shadow-md ${role === "manager" ? "bg-gradient-to-b from-indigo-800 to-indigo-600" : "bg-gradient-to-b from-blue-700 to-blue-500"} text-white`}>
        <h2 className="text-2xl font-bold mb-6">{role === "manager" ? "Manager Panel" : "Employee Panel"}</h2>
        <nav className="space-y-3">
          {role === "manager" && (
            <>
              <SidebarItem icon={<FaUsers />} label="Employee Data" active={selectedTab === "employeeData"} onClick={() => setSelectedTab("employeeData")} />
              <SidebarItem icon={<FaUserTie />} label="Employee Details" active={selectedTab === "employeeDetails"} onClick={() => setSelectedTab("employeeDetails")} />
              <SidebarItem icon={<FaUserPlus />} label="Add Team Member" active={selectedTab === "addTeamMember"} onClick={() => setSelectedTab("addTeamMember")} />
              <SidebarItem icon={<FaCommentDots />} label="Submit Feedback" active={selectedTab === "feedback"} onClick={() => setSelectedTab("feedback")} />
            </>
          )}
          {role === "employee" && (
            <SidebarItem icon={<FaCommentDots />} label="Feedback Received" active={selectedTab === "feedback"} onClick={() => setSelectedTab("feedback")} />
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white rounded-xl shadow-lg p-10 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Welcome to the Dashboard</h1>
          {!selectedTab && (
            <p className={`text-center text-lg ${role === "manager" ? "text-green-600" : "text-blue-600"}`}>
              {role === "manager" ? "Manager has logged in" : "Employee has logged in"}
            </p>
          )}

          {selectedTab === "employeeData" && (
            <Section title="Employee Data">
              <TeamTable team={team} />
            </Section>
          )}

          {selectedTab === "employeeDetails" && (
            <Section title="Employee Details">
              <TeamTable team={team} showManager />
            </Section>
          )}

          {selectedTab === "addTeamMember" && (
            <Section title="Add Employee">
              <AddEmployeeForm setSelectedTab={setSelectedTab} />
            </Section>
          )}

          {selectedTab === "feedback" && role === "manager" && <SubmitFeedback />}
          {selectedTab === "feedback" && role === "employee" && <FeedbackHistory />}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition hover:bg-white hover:text-indigo-700 ${active ? "bg-white text-indigo-700 font-semibold" : "text-white"}`}
    onClick={onClick}
  >
    {icon} <span>{label}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
    {children}
  </div>
);

const TeamTable = ({ team, showManager = false }) => (
  <div className="overflow-x-auto rounded-lg shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Username</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
          {showManager && <th className="px-6 py-3 text-left text-sm font-semibold">Manager Email</th>}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {team.map(emp => (
          <tr key={emp.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm">{emp.id}</td>
            <td className="px-6 py-4 text-sm">{emp.username}</td>
            <td className="px-6 py-4 text-sm">{emp.email}</td>
            {showManager && <td className="px-6 py-4 text-sm">{emp.manager_email || "N/A"}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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
      e.target.reset();
      setSelectedTab("employeeData");
    } catch (err) {
      console.error("Add Employee Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input name="username" required className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input name="email" type="email" required className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input name="password" type="password" required className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">Add Employee</button>
    </form>
  );
};

export default Dashboard;
