import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmployeeButtons } from '../../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { columns } from '../../../utils/EmployeeHelper';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  // Fetch projects for a single employee by _id
  const fetchProjectsByEmployee = async (empId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/employee/projects/${empId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response)
      if (response.data.success) {
        return response.data.projects.map(p => p.Title); // return array of project titles
      }
      return [];
    } catch (error) {
      console.error('Error fetching projects for employee:', error);
      return [];
    }
    
  };


  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        const empData = await Promise.all(
          response.data.employees.map(async (emp, index) => {
            // Fetch projects for each employee
            const projectTitles = await fetchProjectsByEmployee(emp._id);

            return {
              _id: emp._id,
              sno: index + 1,
              dep_name: emp.department?.dep_name || "",
              name: emp.userId?.name || "",
              dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "",
              profileImage: emp.userId?.profileImage ? (
                <img
                  width={40}
                  className='rounded-full'
                  src={`http://localhost:4000/${emp.userId.profileImage}`}
                  alt={emp.userId.name}
                />
              ) : null,
              projects: projectTitles.length > 0 ? projectTitles.join(", ") : "No Projects",
              action: <EmployeeButtons Id={emp._id} />,
            };
          })
        );

        setEmployees(empData);
        setFilteredEmployees(empData);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        console.error(error);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center my-2">
        <input
          type="text"
          placeholder="Search By Name"
          className="px-4 py-0.5 border rounded"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredEmployee}
          pagination
          progressPending={empLoading}
        />
      </div>
    </div>
  );
};

export default List;
