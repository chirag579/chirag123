import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {addEmployee,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId, getProjects} from '../controllers/employeeController.js';

const router=express.Router();

router.get('/',authMiddleware,getEmployees)
router.get('/projects/:id',authMiddleware,getProjects)
router.post('/add',authMiddleware,addEmployee)
router.get('/:id',authMiddleware,getEmployee)
router.put('/:id',authMiddleware,updateEmployee)
router.get('/department/:id',authMiddleware,fetchEmployeesByDepId)
export default router
