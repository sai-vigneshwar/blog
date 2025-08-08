import React, { useEffect, useRef, useState } from 'react'
import {assets, blogCategories} from '../../assets/assets.js'
import Quill from 'quill';
import { useAppContext } from '../../context/ContextApp.jsx';
import toast from 'react-hot-toast';

import {parse} from 'marked';


const AddBlog = () => {


  const {axios}=useAppContext()
  const [isAdding,setIsAdding]=useState(false)
  const [loading,setLoading]=useState(false)

  const editorRef=useRef(null)
  const quillRef=useRef(null)

const [image,setImage]=useState(false)
const [title,setTitle]=useState('')
const [subTitle,setSubTitle]=useState('')
const [category,setCategory]=useState('startup')
const [isPublished,setIsPublished]=useState(false)


const generateContent=async()=>{
if(!title) return toast.error("Please enter the title to get the content")
try{
  setLoading(true);
  const response =await axios.post('/api/blog/generate',{prompt:title})
  const data = response.data; 

if (data.success) {
  quillRef.current.root.innerHTML = parse(data.content)
} else {
  toast.error(data.message || "Failed to generate content");
}
}catch(error){
toast.error(error.message+" error")
}
finally{
  setLoading(false);
}
}



const onSubmitHandler =async(e)=>{
  try{
  e.preventDefault();
  setIsAdding(true)

  const blog={ title,subTitle,description:quillRef.current.root.innerHTML,category,isPublished}
   
  const formData=new FormData();
  formData.append('blog',JSON.stringify(blog))
  formData.append('image',image)
  const {data}  =await axios.post('/api/blog/add',formData);
  if(data.success){
    toast.success(data.message);
    setImage(false);
    setTitle('')
    quillRef.current.root.innerHTML=''
    setCategory('Startup')
      toast.success("Blog added successfully")
  }
  else{
    toast.error(data.message)
  }
  }catch(error){
   toast.error(error.message)
  }
  finally{
    setIsAdding(false)
  }
}


useEffect(()=>{
  if(!quillRef.current && editorRef.current){
    quillRef.current=new Quill(editorRef.current,{theme:'snow'})
  }
},[])

  return (
    <form onSubmit={onSubmitHandler}className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
     <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded '>
     <p>Upload thumbnail</p>
     <label htmlFor="image">
      <img src={!image? assets.upload_area:URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
      <input onChange={(e)=>setImage(e.target.files[0])}type="file" id='image' hidden required/>
     </label>
     <p className='mt-4'>Blog title</p>
     <input type='text' placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e=>setTitle(e.target.value)} value={title}/>
     
      <p className='mt-4'>Sub title</p>
     <input type='text' placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e=>setSubTitle(e.target.value)} value={subTitle}/>
     

     <p className='mt-4'>Blog Description</p>
     <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
      <div ref={editorRef}></div>
      
      <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline hover:bg-red-400 cursor-pointer transition-all ease-in-out duration-1000'>{loading?" Generating ...." :"Generate with AI"}</button>
     </div>
    <p className='mt-4'>Blog Category</p>
    <select onChange={e=>setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded '>

     <option value="">Select category</option>
     {blogCategories.map((item,index)=>{
      return <option key={index} value={item}>{item}</option>
     })}
    </select>
  <div className='flex gap-2 mt-4'>
    <p> Publish Now</p>
    <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e=>setIsPublished(e.target.checked)}/>
  </div>

 <button disable={isAdding} type="submit" className="bg-purple-700 text-white p-3 rounded-full m-2 ">
  {isAdding? 'Adding.....':'Add Blog'}</button>


      </div> 

    </form>
  )
}

export default AddBlog
