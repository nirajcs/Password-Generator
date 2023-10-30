import React from 'react' 
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = () => {

  const {userInfo} = useSelector((state)=>state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async()=>{
    try {
      let res = await logoutApiCall().unwrap();
      dispatch(logout());
      console.log(res);
      toast.success(res.message)
      navigate('/')
    } catch (error) {
      toast.error(error?.data.message);
    }
  }

  return (
    <div className='flex justify-between bg-primaryColor p-3'>
        <h1 className='w-1/3 text-white font-bold md:text-xl'>Password Generator</h1>
        {
          (userInfo) ? (
            <>
              <h1 className='w-1/3 text-white font-medium text-lg text-center'>Hi, {userInfo.name}</h1>
              <div className='w-1/3 flex justify-end'>
                <RiLogoutCircleRLine className='text-3xl text-white cursor-pointer' onClick={logoutHandler}/>
              </div>
            </>
          ):null
        }
    </div>
  )
} 

export default Header