import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import path from "path";
import Project from "../models/Project.js"

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
      projects, 
    } = req.body;

    console.log(req.body);

    
    if (!name || !email || !employeeId || !department || !salary || !password || !role) {
      return res
        .status(400)
        .json({ success: false, error: "All required fields must be filled." });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already registered" });
    }

    //
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    
   
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      projects,
    });

    await newEmployee.save();

    
    if (projects.length > 0) {
      await Project.updateMany(
        { _id: { $in: projects} },
        { $addToSet: { employeeIds: newEmployee._id } } 
      );
    }

    
    res.status(201).json({ success: true, employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "-password")
      .populate("department")
      .populate("projects", "Title")
      .lean();

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error fetching employees" });
  }
};

import mongoose from "mongoose";

const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    let employee = null;

    // 1. Try as Employee ID
    if (mongoose.Types.ObjectId.isValid(id)) {
      employee = await Employee.findById(id)
        .populate("userId", { password: 0 })
        .populate("department")
        .populate("projects", "Title");
          
    }

    // 2. Fallback: try as User ID
    if (!employee) {
      console.log(id)
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
     
    }

    // 3. Still nothing? -> 404
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    console.log("Employee found:", employee._id.toString());
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error in getEmployee:", error.message);
    return res.status(500).json({ success: false, error: "Server error in getEmployee" });
  }
};


const updateEmployee= async(req,res)=>{
try{
const {id}=req.params;
const{name,
  maritalStatus,
  designation,
  department,
  salary,
 
}=req.body;
const employee=await Employee.findById({_id:id})
if(!employee){
  return res.status(404).json({success:false,error:"employee not found"})
}
const user=await User.findById({
  _id:employee.userId
})
const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name})
const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{
  maritalStatus,
  designation,salary,department
})

if(!updateEmployee||!updateUser){
  return res.status(404).json({success:false,error:"document not found"});
}
return res.status(200).json({success:true,message:"employee updated"})
}catch(error){
return res.status(500).json({success:false,error:"update employees server error"})
}
}

const fetchEmployeesByDepId=async(req,res)=>{
 const {id}=req.params;
try{
const employees=await Employee.find({department:id})
return res.status(200).json({success:true,employees})
}catch(error){
  return res.status(500).json({success:false,error:"get employeesby DepId server error"})

}
}
const getProjects = async (req, res) => {
  try {
    const { id } = req.params; // employee _id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid employee ID" });
    }

    const projects = await Project.find({ employeeIds: id })
      .select("Title Client startDate endDate");

    return res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching projects for employee:", error);
    return res.status(500).json({ success: false, error: "Server error while fetching projects" });
  }
};
export {getEmployee,updateEmployee,fetchEmployeesByDepId,getProjects,addEmployee};