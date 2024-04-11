import express from 'express';
import { register,getUsers } from '../controllers/auth.controller.js';
const router = express.Router();

//Router

router.post("/register",register);
router.get('/getusers',getUsers);

export default router;