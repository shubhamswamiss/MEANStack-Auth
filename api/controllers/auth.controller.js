import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const role = await Role.find({ role: "user" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.userName,
      email: req.body.email,  
      password: hashPassword,
      roles: role,
      
    });
    const uniqueUser = await User.findOne({ username:req.body.userName })
    const uniqueEmail = await User.findOne({ email:req.body.email});
    if(uniqueEmail){
      console.log(uniqueEmail);
      return next(CreateError(400, "Email is already exists!"));
    }
    if(uniqueUser){
      console.log(uniqueUser);
     return next(CreateError(400, "Username must be unique!"));
    }
    await newUser.save();
    return next(CreateSuccess(200, "User Registered Successfully!"));
  } catch (error) {
    return next(CreateError(500, "Internal Serevr Error!"));
  }
};

export const registerAdmin = async (req, res, next) => {
   try {
     const role = await Role.find({ });
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password, salt);
     const newUser = new User({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       username: req.body.userName,
       email: req.body.email,
       password: hashPassword,
       isAdmin: true,
       roles: role,
     });

     const uniqueUser = await User.findOne({ username:req.body.userName })
     if(uniqueUser){
      return next(CreateError(400, "Username must be unique."))
     }
     await newUser.save();
     return next(CreateSuccess(200, "Admin Registered Successfully!"));
   } catch (error) {
     return next(CreateError(500, "Internal Serevr Error!"));
   }
 };

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return next(CreateError(500, "Internal Serevr Error!"));
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    .populate("roles","role");
    
    const { roles } = user;
    if (!user) {
      return next(CreateError(404, "User not found!"));
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
    if (!isPasswordCorrect) {
      return next(CreateError(400, "Password is incorrect!"));
    }
    const token = jwt.sign(
      {id: user._id, isAdmin: user.isAdmin, roles: roles},
      process.env.JWT_SECRET
    )
    res.cookie("access_token", token, {httpOnly:true})
    .status(200)
    .json({
      status: 200,
      message: "Login Success",
      data: user
    })

  } catch (error) {
    return next(CreateError(500, "Something went wrong!"));
  }
};
