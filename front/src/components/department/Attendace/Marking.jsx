import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../../utils/AttendanceHelper'
import axios from 'axios'
import { useState } from 'react'
import { AttendanceButtons } from '../../../utils/AttendanceHelper'
const Marking = () => {
const [Emp,setEmp]=useState([])


   const fetch=async()=>{
 try{
          const response=await axios.get("http://localhost:4000/api/attendance",{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          })
       
 if(response.data.success){
            let sno=1;
             console.log(response.data)
  const data=await response.data.employees.map((emp)=>({
    _id:emp._id,
    sno:sno++,
    employeeId:emp.employeeId,
    name:emp.name,
    department:emp.department,

    action:(<AttendanceButtons Id={emp._id} attendanceStatus={emp.attendanceStatus} />),
  }));
  setEmp(data);
 }

        }catch(error){
          if(error.response && error.response.data){
          alert(error.response.data.error)
        }
  
        }
      }
useEffect(()=>{
fetch();
  },[])

  return (
    <div className='p-6'>
      <div className='text-center'>
      <h3 className='text-2xl font bold'>Manage Attendance</h3>
      </div>
      <div className='flex'>
   <input type="text"
    placeholder="Search by Emp Id"
    className='px-4 py-0.5 border' />
   
</div>

<div>
  <DataTable columns={columns} data={Emp}/>
</div>

    </div>
  )
}

export default Marking
