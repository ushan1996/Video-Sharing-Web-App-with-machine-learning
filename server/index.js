import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { spawn } from 'child_process';
const app = express();
// app.get('/python', (req, res) => {
//     const pythonProcess = spawn('python', ['yourPythonScript.py']);
//     pythonProcess.stdout.on('data', (data) => {
//       res.send(data);
//     });
//   });


// const pythonProcess = spawn('python', ['yourPythonScript.py']);
// pythonProcess.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });
// pythonProcess.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });
// pythonProcess.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });

dotenv.config();
const connect = () =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err) =>{
        throw err;  
    });
};
app.use(cookieParser());
//allow json file in outside app.use(express.json())
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/videos",videoRoute);
app.use("/api/comments",commentRoute);
app.use( (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong, Please Check Again, Thank you.....!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
} )
app.listen(8800,()=>{
    connect();
    console.log("Connected..!");
})
