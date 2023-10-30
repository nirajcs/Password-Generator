import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const { userInfo } = useSelector((state)=>state.auth);

    const [register,{isLoading}] = useRegisterMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = async(e)=>{
        e.preventDefault()
        if(!name || !email || !password || !confirm){
            toast.error("All fields are required")
            return
        }
        if(password != confirm){
            toast.error("Passwords Doesn't Match")
            return
        }
        try {
            let res = await register({name,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            if(res){
                toast.success('Registered Successfully')
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
    })

  return (
    <div className='h-5/6 flex items-center justify-center'>
        <div className='md:w-2/6 bg-yellow-500 rounded-lg'>
            <div className='text-center bg-primaryColor p-2 rounded-tr-lg rounded-tl-lg'>
                <h1 className='text-white font-bold text-2xl'>Register</h1>
            </div>
            <form className='p-5' onSubmit={submitHandler}>
                <div className='my-2'>
                    <label className='text-primaryColor font-bold' htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} id='name' className='w-full focus:outline-none focus:border-b-2 border-primaryColor p-1'/>
                </div>
                <div className='my-2'>
                    <label className='text-primaryColor font-bold' htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id='email' className='w-full focus:outline-none focus:border-b-2 border-primaryColor p-1'/>
                </div>
                <div className='my-2'>
                    <label className='text-primaryColor font-bold' htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} id='password' className='w-full focus:outline-none focus:border-b-2 border-primaryColor p-1'/>
                </div>
                <div className='my-2'>
                    <label className='text-primaryColor font-bold' htmlFor="confirm">Confirm Password</label>
                    <input type="password" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}} id='confirm' className='w-full focus:outline-none focus:border-b-2 border-primaryColor p-1'/>
                </div>
                <div className="mt-3 flex justify-between">
                    <button type="submit" className='bg-primaryColor hover:bg-secondaryColor px-3 py-1 rounded-lg text-secondaryColor hover:text-primaryColor hover:border-2 border-primaryColor font-medium'>Register</button>
                    <Link to='/'><h6 className='text-primaryColor hover:underline'>Login</h6></Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register