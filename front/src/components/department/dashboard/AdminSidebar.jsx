import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendar, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUnity, FaUser, FaUsers, FaUsersCog, FaUsersSlash, FaProjectDiagram, FaClipboardList } from 'react-icons/fa'
const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>

      <div className="px-4">
<NavLink to="/admin-dashboard" className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
  <FaTachometerAlt/>
  <span>Dashboard</span>
  </NavLink>

  <NavLink to="/admin-dashboard/employees"  className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`} >
  <FaUsers/>
  <span>Employee</span>
  </NavLink>

<NavLink to="/admin-dashboard/departments"  className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
  <FaBuilding/>
  <span>Department</span>
  </NavLink>

  <NavLink to="/admin-dashboard/leaves"className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
  <FaCalendar/>
  <span>Leave</span>
  </NavLink>

 <NavLink to="/admin-dashboard/salary/add"  className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
  <FaMoneyBillWave/>
  <span>Salary</span>
  </NavLink>

 <NavLink to="/admin-dashboard/Attendance/Marking" className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}> 
   <FaClipboardList />
  <span>Attendance</span>
  </NavLink>

  <NavLink to="/admin-dashboard/Attendance/AttendanceList" className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}> 
   <FaClipboardList />
  <span>Attendance Report</span>
  </NavLink>

   <NavLink to="/admin-dashboard/setting"  className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
  <FaCogs/>
  <span>Settings</span>
  </NavLink>   
     <NavLink to="/admin-dashboard/Project"  className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
  <FaProjectDiagram />
  <span>Project</span>
  </NavLink>   
    <NavLink to="/admin-dashboard/ProjectList"  className={({isActive})=>` ${isActive ? "bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
   <FaProjectDiagram />
  <span>ProjectList</span>
  </NavLink>  
      </div>
    </div>
  )
}

export default AdminSidebar
