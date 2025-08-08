import express from "express";
import { adminLogin, approveCommentByID, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controller/adminController.js";
import { auth } from "../middleware/auth.js";
import {registerController} from "../controller/registerController.js";


const adminRouter=express.Router();
adminRouter.post("/login",adminLogin);
adminRouter.get("/comments",auth,getAllComments)
adminRouter.get("/blogs",auth,getAllBlogsAdmin)
adminRouter.post("/delete-comment",auth,deleteCommentById)
adminRouter.post("/approve-comment",auth,approveCommentByID)
adminRouter.get("/dashboard",auth,getDashboard)
adminRouter.post("/register",registerController);

export default adminRouter;
