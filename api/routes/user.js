import express from 'express';
import { getAllUsers, getById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//Get all users
router.get('/', verifyAdmin, getAllUsers);

//Get by id
router.get('/:id', verifyUser, getById);

export default router;