import React from 'react'
import Header from '../components/Header'
import Routers from '../routes/Routers'

const Layout = () => {
  return (
    <div className='h-screen flex flex-col justify-between bg-secondaryColor'>
        <Header/>
        <Routers/>
    </div>
  )
}

export default Layout