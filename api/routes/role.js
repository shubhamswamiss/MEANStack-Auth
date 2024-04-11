import express from 'express';
import { createRole, getAllRoles, updateRole } from '../controllers/role.controller.js';

const router = express.Router();

//Create a new role in DB
router.post('/create', createRole);

//Update role in DB
router.put('/update/:id', updateRole);

//Get all the roles from DB
router.get('/getAll', getAllRoles);

export default router;