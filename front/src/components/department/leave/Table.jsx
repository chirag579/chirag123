import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { columns } from '../../../utils/LeaveHelper'
import { LeaveButtons } from '../../../utils/LeaveHelper'
const Table = () => {


const[leaves,setleaves]=useState([])
const[filteredleaves,setfilteredleaves]=useState([])
  
    const fetchLeaves=async()=>{
 try{
          const response=await axios.get("http://localhost:4000/api/leave",{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          })
  
          if(response.data.success){
            let sno=1;
             console.log(response.data)
  const data=await response.data.leaves.map((leave)=>({
    _id:leave._id,
    sno:sno++,
    employeeId:leave.employeeId.employeeId,
    name:leave.employeeId.userId.name,
    leaveType:leave.leaveType,
    department:leave.employeeId.department.dep_name,
    days:
      new Date(leave.endDate).getDate()-
      new Date(leave.startDate).getDate(),
    status:leave.status,

    action:(<LeaveButtons Id={leave._id}/>),
  }));
  setleaves(data);
   setfilteredleaves(data)
  
          }
        }catch(error){
          if(error.response && error.response.data){
          alert(error.response.data.error)
        }
  
        }
      }
useEffect(()=>{
fetchLeaves();
  },[])


   const filterByinput=(e)=>{
      const records=leaves.filter((leave)=>(
        leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
      ))
      setfilteredleaves(records)
    }
     const filterbyButton=(status)=>{
      const records=leaves.filter((leave)=>(
        leave.status.toLowerCase().includes(status.toLowerCase())
      ))
      setfilteredleaves(records)
    }


  return (
    <>
    {filteredleaves? (
    <div className='p-6'>
      <div className="text-center">
      <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
        type="text"
        placeholder="Search By Employee ID"
        className="px-4 py-0.5 border"
        onChange={filterByinput}
        />

        <div className='space-x-3'>
        <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
        onClick={()=>{filterbyButton("Pending")}}>Pending</button>
        <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
        onClick={()=>{filterbyButton("Approve")}}>Approve</button>
        <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
        onClick={()=>{filterbyButton("Rejected")}}>Rejected</button>
</div>
      </div>

       <div>
        <div className='mt-3'>
      <DataTable columns={columns} data={filteredleaves} pagination/>
      </div>
    </div>
    </div>
    ): <div>...Loading</div>}
    </>
    
  )
  
}

export default Table
