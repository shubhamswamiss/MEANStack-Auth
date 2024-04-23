import express from 'express';
import { register,getUsers,login,registerAdmin,sendEmail,resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

//Register
router.post("/register",register);

//GetUsers
router.get('/getusers',getUsers);

//Login
router.post('/login',login);

//Register as Admin
router.post('/register-admin',registerAdmin);

//Send reset email
router.post("/send-email", sendEmail);

//Reset Password
router.post("/reset-password",resetPassword);

export default router;