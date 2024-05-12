import React, { useState } from 'react'
import { Link } from 'react-router-dom/dist'
import { Button, InputField } from '../../components/public'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className='flex flex-col items-center mt-[200px] gap-6'>
            <h1 className='font-semibold text-[30px]'>Đăng ký tài khoản</h1>
            <p>Đã có tài khoản? <Link to='/login' className='hover:underline'>Đăng nhập ngay</Link></p>
            <div className='w-[300px]'>
                <label className='font-semibold'>Tên người dùng</label>
                <InputField
                    data={username}
                    setData={setUsername}
                    placeholder='tên'
                />
            </div>
            <div className='w-[300px]'>
                <label className='font-semibold'>Email</label>
                <InputField
                    data={email}
                    setData={setEmail}
                    placeholder='Email'
                />
            </div>
            <div className='w-[300px]'>
                <label className='font-semibold'>Mật khẩu</label>
                <InputField
                    data={password}
                    setData={setPassword}
                    placeholder='Mật khẩu'
                    type='password'
                />
            </div>
            <div className='w-[300px]'>
                <Button
                    name='Đăng ký'
                />
            </div>
        </div>
    )
}

export default Register
