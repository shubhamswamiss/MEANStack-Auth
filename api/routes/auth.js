import express from 'express';
import { register,getUsers,login,registerAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

//Register
router.post("/register",register);

//GetUsers
router.get('/getusers',getUsers);

//Login
router.post('/login',login);

//register as Admin
router.post('/register-admin',registerAdmin);

//send reset email
router.post("/send-email", sendEmail);

export default router;