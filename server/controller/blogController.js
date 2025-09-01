

/// this is middleware to add the blog in the mongodb using Blog.js in models
import fs from 'fs';
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js';
import main from '../config/Gemini.js';
import { sendMail } from './sendingMail.js';
import { register } from '../models/register.js';


export const addBlog=async (req,res)=>{
  try{
    const {title,subTitle,description,category,isPublished,username}=JSON.parse(req.body.blog);

    const imageFile=req.file;
   

    ///checking input fields
    if(!title||!description||!category||!imageFile){
        return res.json({success:true,message:"missing required fields"});
    }

    const fileBuffer=fs.readFileSync(imageFile.path)

    //upload Image to Imagekit
     const response =await imagekit.upload({
        file:fileBuffer,
        fileName:imageFile.originalname,
        folder:"/blogs"
    })

    //optimization through imagekit URL transformation

    const optimizedImageUrl=imagekit.url({
        path:response.filePath,
        transformation:[
            {quality:'auto'},//Auto compression
            {format:'webp'},//convert to modern format
            {width:'1280'}//width resizing
        ]
    })

    const image=optimizedImageUrl;

    await Blog.create({title,subTitle,description,category,image,isPublished,username})

    const otherUser=await register.find({username:{$ne:username}});
    for(let user of otherUser){
      const emailId=user.email;
      try {
    await sendMail(emailId, "New Blog", `New blog is released from ${username}`);
  } catch (err) {
    console.error(`Failed to send email to ${emailId}:`, err.message);
  }
    }
    res.json({success:true,message:"Blog added successfully"});
    
}catch(error){
     res.json({success:"false",message:error.message});
}
  

}


/////////get all the blogs function
export const getAllBlogs =async(req,res)=>{
    try{
  const blogs=await Blog.find({isPublished:true})
  res.json({success:true,blogs})
    }
   catch(error){
     res.json({success:false,message:error.message})
   }
}


/////////get all the blogs by id function
export const getBlogById =async(req,res)=>{
    try{
  const {blogId}=req.params;
  const blog=await Blog.findById(blogId)
  if(!blog){
    return res.json({success:false,message:"Blog not found"})
  }
  res.json({success:true,blog})
    }
   catch(error){
     res.json({success:false,message:error.message})
   }
}

/////////delete all the blogs by id function
export const deleteBlogById =async(req,res)=>{
    try{
  const {id}=req.body;
  await Blog.findByIdAndDelete(id)


    ///Delete all comments associated with that id
    await Comment.deleteMany({blog:id});
  
  res.json({success:true,message:"Blog deleted successfully"})
    }
   catch(error){
     res.json({success:false,message:error.message})
   }
}

///// to toggle the publish
export const togglePublish =async(req,res)=>{
    try{
  const {id}=req.body;
  const blog=await Blog.findById(id);
  blog.isPublished=!blog.isPublished
  await blog.save()
 
  
  res.json({success:true,message:"Blog status updated"})
    }
   catch(error){
     res.json({success:false,message:error.message})
   }
}


//// function to enter the comment in db


export const addComment=async(req,res)=>{
    try{
        const {blog,name,content} =req.body;
        await Comment.create({blog,name,content});
          res.json({success:true,message:"successfully comment added"})
    }
    catch(error){
        res.json({success:false,message:error.messaage})
    }
}


/// function to get all the blog comments

export const getBlogComments=async(req,res)=>{
    try{
        const {blogId} =req.body;
        
        const comments=await Comment.find({blog:blogId,isApproved:true}).sort({createAt:-1});
          res.json({success:true,comments})
    }
    catch(error){
        res.json({success:false,message:error.messaage})
    }
}


 export const generateContent =async(req,res)=>{

   try{
    const {prompt} =req.body
    const content=await main(prompt +" "+"Generate a blog content for this topic in simple test format")
  res.json({success:true,content});
  }
  catch(error){
    res.json({success:false ,message:error.message});
  }

 }