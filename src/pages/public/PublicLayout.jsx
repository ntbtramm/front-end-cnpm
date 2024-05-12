import React from 'react'
import { Outlet } from 'react-router-dom'
import bg from '../../assets/images/authBG.svg'
const PublicLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    window.location.href = '/home'
  }
  return (  
    <>
      <div className='flex w-full'>
        <div className='w-1/2'>
         <Outlet/>
        </div>
        <div className='w-1/2'>
          <img src={bg} alt="" className='object-cover w-screen h-screen' />
        </div>
      </div>
    </>
  )
}

export default PublicLayout
