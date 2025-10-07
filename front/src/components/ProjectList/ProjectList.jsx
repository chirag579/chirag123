import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectList = () => {
  const navigate = useNavigate();
  const [Projects, setProjects] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/Project/projectList`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle viewing team members
  const handleTeam = async (employeeIds) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/Project/projectDetails`,
        { employeeIds },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSelectedEmployees(response.data.employees);
        setShowModal(true);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  if (!Projects) {
    return <div>...Loading</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Project List</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />
      </div>
      <div>
        <table className="w-full text-sm text-left text-gray-500 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">WoM</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {Projects.map((project, index) => (
              <tr
                key={project._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{project.Title}</td>
                <td className="px-6 py-3">{project.Client}</td>
                <td className="px-6 py-3">{project.Address}</td>
                <td className="px-6 py-3">{project.WoM}</td>
                <td className="px-6 py-3">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-6 py-3">{project.description || "-"}</td>
                <td>
                  <button
                    onClick={() => handleTeam(project.employeeIds)}
                    className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
                  >
                    Team
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-170 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Employee Details</h2>
            {selectedEmployees.map((employee) => (
              <div key={employee._id} className="border p-2 mb-2 rounded">
                <p>
                  <strong>Employee ID:</strong> {employee.employeeId || "-"}
                </p>
                <p>
                  <strong>User ID:</strong> {employee.userId || "-"}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {employee.dob
                    ? new Date(employee.dob).toLocaleDateString()
                    : "-"}
                </p>
                <p>
                  <strong>Gender:</strong> {employee.gender || "-"}
                </p>
                <p>
                  <strong>Marital Status:</strong> {employee.maritalStatus || "-"}
                </p>
                <p>
                  <strong>Designation:</strong> {employee.designation || "-"}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {employee.department?.dep_name || "-"}
                </p>
                <p>
                  <strong>Salary:</strong> {employee.salary ? `$${employee.salary}` : "-"}
                </p>
              </div>
            ))}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
