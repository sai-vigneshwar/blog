import jwt  from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";
import { register } from "../models/register.js";
import bcrypt from "bcrypt";

export const adminLogin= async(req,res)=>{
   try{
  const {email,password}=req.body;

  const user=await register.findOne({email});
  if(!user){
    return res.json({success:false,message:"Invalid credentials"})
  }
  const checkPassword=await bcrypt.compare(password,user.password);
  if(!checkPassword) return res.json({success:false,message:"Invalid credentials"})

  const token=jwt.sign({email},process.env.JWT_SECRET);
  return res.json({success:true,token,username:user.username})
   }
   catch(error){
       return res.json({success:"false",message:error.message})
   }
 
}

///getALL blogs for admin
export const getAllBlogsAdmin=async (req,res)=>{
  try {
    const blogs=await Blog.find({username:req.body.username}).sort({createdAt:-1});
    res.json({success:"true",blogs})
  } catch (error) {
     return res.json({success:"false",message:error.message})
  }
}

//getall comments for admin
export const getAllComments=async (req,res)=>{
  try {
    const nonfilteredComments=await Comment.find({}).populate("blog").sort({createdAt:-1});
  
    const comments=nonfilteredComments.filter((obj)=>obj.blog.username===req.body.username);
    res.json({success:"true",comments})
  } catch (error) {
     return res.json({success:"false",message:error.message})
  }
}

//function for getDashBoard

export const getDashboard=async (req,res)=>{
  try {
    const username=req.body.username;
   const recentBlogs=await Blog.find({username}).sort({createdAt:-1}).limit(5);
   const blogs=await Blog.countDocuments({username});
   const getcomments=await Comment.find({}).populate("blog");
   const arr=getcomments.filter((obj)=>obj.blog.username===username);
    const comments=arr.length;
     const drafts=await Blog.countDocuments({username,isPublished:false});

     const dashboardData={
      blogs,comments,drafts,recentBlogs
     }
    res.json({success:"true",dashboardData})
  } catch (error) {
     return res.json({success:"false",message:error.message})
  }
}


//function to delete the comment

export const deleteCommentById=async (req,res)=>{
  try {
    const {id}=req.body;
    await Comment.findByIdAndDelete(id);

  

    res.json({success:"true",message:"Comment deleted successfully"})
  } catch (error) {
     return res.json({success:"false",message:error.message})
  }
}



//function to PPROVE the comment

export const approveCommentByID=async (req,res)=>{
  try {
    const {id}=req.body;
    await Comment.findByIdAndUpdate(id,{isApproved:true});
    res.json({success:"true",message:"Comment Approved successfully"})
  } catch (error) {
     return res.json({success:"false",message:error.message})
  }
}