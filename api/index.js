import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import path from 'path'
dotenv.config()

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
});

const __dirname = path.resolve()

const app = express();
app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"client" ,"dist" ,"index.html"))
})
app.use(express.json())
app.use(cookieParser())
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

app.listen(3000, () => {
  console.log("Server listening at port 3000!");
});
