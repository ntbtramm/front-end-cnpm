import React, { Fragment } from 'react'
import logo from '../../assets/images/logo.svg'
import { navigation } from '../../ultils/constants'
import { Link, useNavigate } from 'react-router-dom'
import {icons} from '../../ultils/icons'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../../redux/appSlice'
import { delete_cookie } from '../../apis/Auth'

const Header = () => {
    const {LuUserCircle2} = icons
    const [select,setSelect] = React.useState('Trang chủ')
    const user = useSelector(state => state.app?.user)
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const handleLogout =async () => {
        // just delete the token
        delete_cookie("session_token")
        dispatch(logoutSuccess())
        toast.success('Đăng xuất thành công')   
        navigate('/login')
    }
    return (
        <header className='flex justify-between items-center px-4 py-2 bg-white shadow-md'>
            <span className='flex gap-2 items-center cursor-pointer' onClick={()=>navigate('/home')}>
                <img src={logo} alt='logo' className='w-10 h-10 ' />
                <span>Bull Library</span>
            </span>
            <div className='flex items gap-8' style={{width:"60%"}}>
                {navigation.map((item,index) => {
                    if (item.for_admin && !user.is_admin){
                        return
                    }
                    return (
                        <Fragment key={index}>
                            <Link to={item.path} onClick={()=>setSelect(item.title)}>
                                <div className={`hover:underline hover:font-semibold p-3 ${select===item.title?"underline semibold":""}`}>
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                        </Fragment>
                    )
                })}
            </div>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                    <LuUserCircle2 size={28}/>
                    <span>
                        {user?.user_name}
                    </span>
                </div>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-md' onClick={handleLogout}>Đăng xuất</button>
            </div>
        </header>
    )
}

export default Header