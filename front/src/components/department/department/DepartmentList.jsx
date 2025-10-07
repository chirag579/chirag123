import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import { columns } from "../../../utils/DepartmentHelper";
import { useState,useEffect } from "react";
import axios from "axios";
import { DepartmentButtons } from "../../../utils/DepartmentHelper";
const DepartmentList = () => {
  const [departments,setDepartments]=useState([])
  const [depLoading,setDepLoading]=useState(false)
  const [filteredDepartments,setfilteredDepartments]=useState([])
  const onDepartmentDelete = async ()=>{
   
     fetchDepartments();
  }
  const fetchDepartments=async()=>{
      setDepLoading(true)
      try{
        const response=await axios.get("http://localhost:4000/api/department",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })

        if(response.data.success){
          let sno=1;
           console.log(response.data)
const data=await response.data.departments.map((dep)=>({
  _id:dep._id,
  sno:sno++,
  dep_name:dep.dep_name,
  action:(<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
}));
setDepartments(data);
setfilteredDepartments(data);

        }
      }catch(error){
        if(error.response && error.response.data){
        alert(error.response.data.error)
      }

      }
      finally{
        setDepLoading(false);
      }
    };
  useEffect(()=>{

    
    
  fetchDepartments();
    

  },[]);

  const filterDepartments=(e)=>{
    const records=departments.filter((dep)=>
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setfilteredDepartments(records)
  }
  return (
<>
{depLoading ? <div> Loading...</div>:
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage </h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      <div className="mt-5">
    <DataTable columns={columns} data={filteredDepartments} pagination/>
      </div>
    </div>
}</>
  );
};

export default DepartmentList;
