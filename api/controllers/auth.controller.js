import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import UserToken from "../models/UserToken.js";
import nodemailer from 'nodemailer';

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

export const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    const user = await  User.findOne({email: {$regex: "^"+email+'$', $options:'i' }});
    if(!user){
      return next(CreateError(400, "User not found to reset the email"));
    }
    const payload = {
      email: req.body.email
    }
    const expirytime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:expirytime});

    const newToken = new UserToken({
      userId: user._id,
      token: token
    });

    const mailTranporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "shubhamswamiss333@gmail.com",
        pass: "ubikhsuqztvhwigv"
      }
    });
    let mailDetails = {
      from: "shubhamswamiss@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `
      <html>
       <head><title>Password Reset Request</title></head>
        <body>
           <h1>Password Reset Request</h1>
           <p>Dear ${user.username},</p>
           <p>We have receive a request to reset your password for your account with BookMYBook. To complete the password reset process, please click on the button below:</p>
           <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color:#4CAF50; color:white; padding:14px 20px; border:none; cursor:pointer; border-radius:4px; ">Reset Password</button></a>
           <p>Please note that this link is valid for a 5mins. If you did not request a password reset, please disregard this message.</p>
           <p>Thank you,</p>
           <p>BookMYBook Team</p>
        </body>
      
      `
    };

    mailTranporter.sendMail(mailDetails, async (err,data)=>{
        if(err){
          console.error(err);
          return next(CreateError(500, "Something went wrong while sending email"))
        }else{
          await newToken.save();
          return next(CreateSuccess(200, "Email sent Successfully"))
        }
    })



    
}
