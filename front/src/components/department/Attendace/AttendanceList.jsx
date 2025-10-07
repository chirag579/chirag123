import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { column } from "../../../utils/AttendanceHelper";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [attendLoading, setAttendLoading] = useState(false);

  const fetchAttendance = async () => {
    setAttendLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/attendance/attend/local",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
 
      if (response.data.success) {
        let sno = 1;
        const grouped = response.data.data;

        
        const data = grouped.map((group) => ({
          _id: group._id,
          sno: sno++,
          date: group._id,
          totalEmployees: group.count,
          presentCount: group.records.filter((r) => r.status === "Present").length,
          absentCount: group.records.filter((r) => r.status === "Absent").length,
        }));

        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching attendance list");
    } finally {
      setAttendLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const filterAttendance = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const records = attendance.filter((a) =>
      a.date.toLowerCase().includes(searchValue)
    );
    setFilteredAttendance(records);
  };

  return (
    <>
      {attendLoading ? (
        <div className="text-center mt-5 text-lg">Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Attendance Summary</h3>
          </div>

          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search by Date (YYYY-MM-DD)"
              className="px-4 py-1 border rounded"
              onChange={filterAttendance}
            />
            
          </div>

          <div className="mt-5">
            <DataTable
              columns={column}
              data={filteredAttendance}
              pagination
              highlightOnHover
              dense
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AttendanceList;
