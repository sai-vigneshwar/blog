import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app=express();

await connectDB();
///Middlewares 
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("api is working");
})

//admin authentication
app.use("/api/admin",adminRouter)

//admin blog creation
app.use("/api/blog",blogRouter);
// app.use("api/blog",()=>{
//     console.log("sai")
// });


const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})

