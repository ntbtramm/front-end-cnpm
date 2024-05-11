import React from 'react'
import { Footer, Header } from '../../components/private'
import { Outlet } from 'react-router-dom/dist'

const PrivateLayout = () => {
  return (
    <div className='w-full'>
      <Header/>
      <div className='w-[1290px] mx-auto mt-8 bg-[#F5F5F5] p-4'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default PrivateLayout