import mongoose from "mongoose";

const subscribeSchema =new mongoose.Schema({
   username:{type:String,required:true},
blogowner:{type:String,required:true},
},{timestamps:true});

 export const subscribe=mongoose.model('subscribe',subscribeSchema);

