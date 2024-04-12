import express from 'express';
import { register,getUsers,login } from '../controllers/auth.controller.js';

const router = express.Router();

//Register
router.post("/register",register);

//GetUsers
router.get('/getusers',getUsers);

//Login
router.post('/login',login);

export default router;