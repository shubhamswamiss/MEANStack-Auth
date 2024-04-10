import express from  'express';
const app = express();

app.use('/',(req,res)=>{
  return res.send("Hello, Welcome to MEAN Stack Project");
})

app.listen(8080,()=>{
    console.log('Connected to backend!');
})