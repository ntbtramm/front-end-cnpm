import React from 'react'
import logo from '../../assets/images/logo.svg'
import { navigation } from '../../ultils/constants'
import { Link, useNavigate } from 'react-router-dom'
import {icons} from '../../ultils/icons'
const Header = () => {
    const {LuUserCircle2} = icons
    const navigate =useNavigate()
    return (
        <header className='flex justify-between items-center px-4 py-2 bg-white shadow-md'>
            <span className='flex gap-2 items-center cursor-pointer' onClick={()=>navigate('/home')}>
                <img src={logo} alt='logo' className='w-10 h-10 ' />
                <span>Bull Library</span>
            </span>
            <div className='flex gap-8'>
                {navigation.map((item) => {
                    return (
                        <>
                            <Link to={item.path}>
                                <div className='hover:underline hover:font-semibold p-3'>
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                        </>
                    )
                })}
            </div>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                    <LuUserCircle2 size={28}/>
                    <span>Triệu</span>
                </div>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>Đăng xuất</button>
            </div>
        </header>
    )
}

export default Header