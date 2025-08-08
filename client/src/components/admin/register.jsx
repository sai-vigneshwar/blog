import React, { useState } from 'react'
import { useAppContext } from '../../context/ContextApp'
import toast from 'react-hot-toast';

const Register = () => {
    
  const {axios, navigate,setToken} = useAppContext();
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    
   
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const {data} = await axios.post('/api/admin/register', {
       name,password,email
      })

      if (data.success) {
        setToken(data.token);
         localStorage.setItem('token',data.token);
          axios.defaults.headers.common['Authorization']=data.token
        toast.success("Registration successful! Please login.")
        navigate('/admin')
      } else {
        toast.error(data.message || "Registration failed")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'> <span className='text-primary'> Admin</span> Register</h1>
            <p className='font-light'>Create your admin account</p>
          </div>
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div>
              <label>Full Name</label>
              <input 
                onChange={(e)=>setName(e.target.value)} 
                value={name} 
                name="name"
                type="text" 
                required 
                placeholder="Enter your full name" 
                className='border-b-2 border-gray-300 p-2 outline-none mb-6 w-full'
              />
            </div>
            <div>
              <label>Email</label>
              <input 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} 
                name="email"
                type="email" 
                required 
                placeholder="Enter your email" 
                className='border-b-2 border-gray-300 p-2 outline-none mb-6 w-full'
              />
            </div>
            <div>
              <label>Password</label>
              <input 
                onChange={(e)=>setPassword(e.target.value)} 
                value={password} 
                name="password"
                type="password" 
                required 
                placeholder="Enter your password" 
                className='border-b-2 border-gray-300 p-2 outline-none mb-6 w-full'
              />
            </div>
           
            <button 
              type="submit" 
              disabled={loading}
              className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500'>
              Already have an account?{' '}
              <span 
                onClick={() => navigate('/admin')} 
                className='text-primary hover:underline cursor-pointer'
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
