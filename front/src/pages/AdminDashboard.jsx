import React from 'react'
import {useAuth} from '../context/authcontext'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/department/dashboard/AdminSidebar'
import  Navbar from '../components/department/dashboard/Navbar'
import AdminSummary from '../components/department/dashboard/AdminSummary'

const AdminDashboard = () => {
 const {user}=useAuth()

  return (
    
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
      <Navbar />
        <Outlet/>
      </div>
      
    </div>
  )
}

export default AdminDashboard
