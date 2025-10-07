import axios from "axios";
import { useNavigate } from "react-router-dom";
export const columns =[

  {
    name:"S no",
    selector:(row) =>row.sno,
    width:"100px"
  },
   {
    name:"Emp ID",
    selector:(row) =>row.employeeId,
    sortable:true,
    width:"130px"
  },
  {
    name:"Name",
    selector:(row) =>row.name,
    width:"90px"
  },
  {
    name:"Leave Type",
    selector:(row) => row.leaveType,
   width:"120px"
  },
   {
    name:"Department",
    selector:(row) => row.department,
    width:"90px"
  },
  {
    name:"Days",
    selector:(row) => row.days,
    center:true
   
  },
  {
    name:"Status",
    selector:(row) => row.status,
    width:"90px"
  },
  {
    name:"Action",
    selector:(row) => row.action,
    center:true
   
  },
]


    

export const LeaveButtons =({Id})=>{
const navigate=useNavigate();

const handleView =(id)=>{
  navigate(`/admin-dashboard/leaves/${id}`)
}
  return(
    <div >
      <button className="px-4 py-1 bg-teal-500 text-white hover:bg-teal-600"
      onClick={()=>handleView(Id)}>view</button>
     
    </div>
  )
}
