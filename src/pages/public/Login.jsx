import React, { useState } from 'react'
import { Link } from 'react-router-dom/dist'
import { Button, InputField } from '../../components/public'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className='flex flex-col items-center mt-[200px] gap-6'>
      <h1 className='font-semibold text-[30px]'>Đăng nhập</h1>
      <p>Chưa có tài khoản? <Link to='/register' className='hover:underline'>Đăng ký ngay</Link></p>
      <div className='w-[300px]'>
        <label className='font-semibold'>Tên đăng nhập</label>
        <InputField
          data={username}
          setData={setUsername}
          placeholder='Tên đăng nhập'
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
      <span className='hover:underline cursor-pointer'>
        Quên mật khẩu
      </span>
      <div>
        <Button
          name='Đăng nhập'
        />
      </div>
    </div>
  )
}

export default Login
