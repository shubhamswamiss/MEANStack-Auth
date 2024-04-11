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


app.listen(8080, () => {
  connectMongoDB();
  console.log("Connected to backend!");
});
