import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
const app = express();
dotenv.config(); 

app.use(express.json());
app.use('/api/role',roleRoute);
app.use('/api/auth',authRoute);

//Error Handler Middleware

app.use((err,req,res,next)=>{
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
    stack: err.stack
  })

})


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
