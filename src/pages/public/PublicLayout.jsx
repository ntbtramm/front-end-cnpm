import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import bg from '../../assets/images/authBG.svg'
import { useSelector } from 'react-redux'
const PublicLayout = () => {
  const isLogin = useSelector(state => state.app?.isLogin)
  const navigate = useNavigate()
  useEffect(()=>{
    if (isLogin) {
      navigate('/home')
    }
  },[])
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
