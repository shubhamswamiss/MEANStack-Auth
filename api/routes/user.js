import express from 'express';
import { getAllUsers, getById } from '../controllers/user.controller.js';

const router = express.Router();

//Get all users
router.get('/',getAllUsers);

//Get by id
router.get('/:id',getById)

export default router;