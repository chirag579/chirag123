import {useState,React} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const columns=[
{
name:"S no",
selector:(row)=>row.sno,
width:"100px"
},
{
name:"Name",
selector:(row)=>row.name,
width:"140px"
},
{
name:"Emp Id",
selector:(row)=>row.employeeId,
width:"160px"
},
{
name:"Department",
selector:(row)=>row.department,
width:"160px"
},
 {
    name:"Action",
    selector:(row) => row.action,
    center:true
   
  }


]
export const column = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Total Records",
    selector: (row) => row.totalEmployees,
    sortable: true,
  },
  {
    name: "Present",
    selector: (row) => row.presentCount,
  },
  {
    name: "Absent",
    selector: (row) => row.absentCount,
  },
];


export const AttendanceButtons =({Id,attendanceStatus})=>{
 const [selected,setSelected] =useState(attendanceStatus);

 
const handlebutton = async(id,status)=>{
 

      
  try{
          const response=await axios.post(`http://localhost:4000/api/attendance/${id}`,{status},{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          })
         if (response.data.success) {
        alert(`Attendance marked as ${status} for employee ${id}`);
        setSelected(status);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update attendance");
    }
      


}
  return(
    <div  className='flex  justify-end gap-2 w-full'>
      {selected ? (
      <button className="  px-4 py-1 bg-teal-500 text-white hover:bg-teal-600"
     disabled
     >{selected}</button>
):(
  <>
      <button className="  px-4 py-1 bg-teal-500 text-white hover:bg-teal-600"
      onClick={()=>handlebutton(Id ,"Present")}
     >Present</button>
      <button className="  px-4 py-1 bg-red-500 text-white hover:bg-red-600"
       onClick={()=>handlebutton(Id,"Absent")}
     >Absent</button>
      <button className=" px-8 py-1 bg-yellow-500 text-white hover:bg-yellow-600"
       onClick={()=>handlebutton(Id,"Sick")}
     >Sick</button>
     </>
     )}
    </div>
  )
}
