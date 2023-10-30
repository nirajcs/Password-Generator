import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { useLoginMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo } = useSelector((state)=>state.auth);

  const [login,{isLoading}] = useLoginMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = async(e)=>{
    e.preventDefault()
    if(!email || !password){
      toast.error("All fields required");
      return
    }
    try {
      let res = await login({email,password}).unwrap();
      dispatch(setCredentials({...res}));
      if(res){
        toast.success('Login Successful')
    }
      navigate('/home');
    } catch (error) {
      toast.error(error?.data.message);
    }
  }

  useEffect(()=>{
    if(userInfo){
      navigate('/home')
    }
  },[userInfo,navigate])

  return (
    <div className='h-5/6 flex justify-center'>
        <div className='md:w-2/6 h-fit bg-yellow-500 rounded-lg mt-20'>
            <div className='text-center bg-primaryColor p-2 rounded-tr-lg rounded-tl-lg'>
                <h1 className='text-white font-bold text-2xl'>Login</h1>
            </div>
            <form className='p-5' onSubmit={submitHandler}>
                <div className='my-2'>
                    <label className='text-primaryColor font-bold' htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id='email' className='w-full focus:outline-none focus:border-b-2 border-primaryColor p-1'/>
                </div>
                <div className='my-2'>
                    <label className='text-primaryColor font-bold' htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} id='password' className='w-full focus:outline-none focus:border-b-2 border-primaryColor p-1'/>
                </div>
                <div className="mt-3 flex justify-between">
                <button type="submit" className='bg-primaryColor hover:bg-secondaryColor px-3 py-1 rounded-lg text-secondaryColor hover:text-primaryColor hover:border-2 border-primaryColor font-medium'>Login</button>
                  <Link to='/register'><h6 className='text-primaryColor hover:underline'>Register</h6></Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login