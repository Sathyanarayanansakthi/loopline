import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const EmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      navigate("/login");
      return;
    }

    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/team", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load employee data");
        navigate("/dashboard");
      }
    };

    fetchEmployees();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Team Members
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Username</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Manager Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="px-4 py-2">{emp.id}</td>
                  <td className="px-4 py-2">{emp.username}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2 capitalize">{emp.role}</td>
                  <td className="px-4 py-2">{emp.manager_email || "N/A"}</td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeData;
