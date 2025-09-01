import express from "express";
import { adminLogin, approveCommentByID, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controller/adminController.js";
import { auth } from "../middleware/auth.js";
import { registerController, verifyOtpController } from "../controller/registerController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/comments", auth, getAllComments);
adminRouter.post("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentByID);
adminRouter.post("/dashboard", auth, getDashboard);
adminRouter.post("/register", registerController);
adminRouter.post("/verify-otp", verifyOtpController);

export default adminRouter;
