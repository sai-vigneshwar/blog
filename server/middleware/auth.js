import jwt from "jsonwebtoken";

export const auth=(req,res,next)=>{
    const token=req.headers.authorization;

    try{
        jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(error){
        //console.log(token);

        res.json({success:false,message:error.message})
    }
}