import React, { useEffect } from 'react'
import { Footer, Header } from '../../components/private'
import { Outlet, useNavigate } from 'react-router-dom/dist'
import { useSelector } from 'react-redux'

const PrivateLayout = () => {
  const isLogin = useSelector(state => state.app?.isLogin)
  const navigate = useNavigate()
  useEffect(()=>{
    if (!isLogin) {
      navigate('/login')
    }
  },[])
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