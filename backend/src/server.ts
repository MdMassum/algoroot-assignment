import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoConfig";
import errorMiddleware from './middleware/error'
import authRouter from './routes/authRoute'
import taskRouter from './routes/taskRoutes'



// handling uncaught exception
process.on("uncaughtException",(err:any)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to uncaught exception")

    server.close(()=>{
        process.exit(1);
    })
})



const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
    credentials: true
}))


// routes -->
app.get('/',(req:Request, res:Response)=>{
    res.json({
        "message":"server up and running"
    })
})
app.use('/api/auth',authRouter)
app.use('/api/tasks',taskRouter)

app.use(errorMiddleware)  // error middleware

// server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// handling unhandled promise rejection
process.on("unhandledRejection",(err:any)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to unhandled Promise Rejection")

    server.close(()=>{
        process.exit(1);
    })
})
