import React, { useEffect,useState } from "react";
import SummaryCard from "./SummaryCard";
import axios from "axios";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
const AdminSummary = () => {
  const [summary,setSummary]=useState(null)
  useEffect(()=>{
    const fetchSummary=async()=>{
    try {
      const sum=await axios.get('http://localhost:4000/api/dashboard/summary',{
       headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
       }
      })
      console.log(sum.data)
      setSummary(sum.data)
    } catch (error) {
      if(error.response){
      alert(error.response.data.error)
      }
      console.log(error.message)
    }
    }
    fetchSummary()
  },[])
  return (
    <>
   {summary===null ?(
      <div>Loading...</div>
    ):(
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-yellow-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.rejected}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.pending}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
     )}
    </>
  );
};

export default AdminSummary;
