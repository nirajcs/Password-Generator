import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import Generator from '../components/Generator'
import { Routes,Route } from 'react-router-dom'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Generator/>}/>
    </Routes>
  )
}

export default Routers