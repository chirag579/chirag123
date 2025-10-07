import React, { useState, useEffect } from "react";
import { getEmployees} from "../../utils/ProjectHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();
const [Project, setProject] = useState({
  Title: "",
  Client: "",
  Address: "",
  WoM: "",
  startDate: "",
  endDate: "",
  employeeIds: [],
  description: "",
});

  

  const [employees,setEmployees]=useState([]);

useEffect(() => {
  const fetchAllEmployees = async () => {
    
    const emps = await getEmployees();
    console.log("Fetched employees:", emps);
    setEmployees(emps);  // emps is an array
  };

  fetchAllEmployees();
}, []);




  const handleChange = (e) => {
        
const { name, value, options } = e.target;

  if (name === "employeeIds") {
    const selected = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setProject((prev) => ({ ...prev, [name]: selected }));
  } else {
    setProject((prev) => ({ ...prev, [name]: value }));
  }
  };
    const handleSubmit = async(e) => {
    e.preventDefault()
    
    try{
      
     const response =await axios.put(`http://localhost:4000/api/Project/add`,Project,{
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')

        }`
      }
     })
     if(response.data.success){
 navigate("/admin-dashboard")
 
     }
    }catch(error){
      if(error.response && error.response.data){
        alert(error.response.data.error)
      }
    }
  }
  return (
    <>{1==1 ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Project</h2>
    
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


  {/* {Title of the project} */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
             Title of the Project
            </label>
            <input
              type="text"
              name="Title"
              onChange={handleChange}
              
              placeholder="Title"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          
          {/* {Client} */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client
            </label>
            <input
              type="text"
              name="Client"
              onChange={handleChange}
              placeholder="client"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        
 {/* {Address of the Client} */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
             Address of the Client
            </label>
            <input
              type="text"
              name="Address"
              onChange={handleChange}
              
              placeholder="Address"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          
          {/* {Work Order Number} */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work Order Number
            </label>
            <input
              type="text"
              name="WoM"
              onChange={handleChange}
              placeholder="WoM"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                name="startDate"
                type="date"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                name="endDate"
                type="date"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
 
          
  {/* {Employee} */}

          <div className="col-span-21">
            <label className="block text-sm font-medium text-gray-700">
              Employee
            </label>
            <select
              name="employeeIds"
              onChange={handleChange}
             multiple
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
            </select>
          </div>
          
        

        
         
          </div>
        <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 w-full"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
               onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              rows="4"
            />
              
            
          </div>

          
        
        <button
          type="submit"

          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Project
        </button>
      </form>
    </div>
    ): <div>Loading...</div>}</>
  );
};

export default Project;
