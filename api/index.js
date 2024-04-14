import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config(); 

app.use(express.json());
app.use(cookieParser());
app.use('/api/role',roleRoute);
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);

//Response Handler Middleware

app.use((obj,req,res,next)=>{
  const statusCode = obj.status || 500;
  const errorMessage = obj.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: [200,201,204].some(a=> a === obj.status) ? true : false,
    status: statusCode,
    message: errorMessage,
  });

});


// app.use('/',(req,res)=>{
//   return res.send("<h1>Hello, Welcome to MEAN Stack Project</h1>");
// })

// app.use('/api/login',(req,res)=>{
//     return res.send('<h1>Login is Success!!</h1>');
// })

// app.use('/api/register',(req,res)=>{
//     return res.send('<h1>Hello, Welcome to MEAN Stack Project</h1>');
// })

//DB Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database!");
  } catch (error) {
    throw error;
  }
};


app.listen(3000, () => {
  connectMongoDB();
  console.log("Connected to backend!");
});
