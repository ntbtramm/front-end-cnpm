import React, { useState } from 'react'
import { Link } from 'react-router-dom/dist'
import { Button, InputField } from '../../components/public'
import { login } from '../../apis/Auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async() => {
    const data={
      email,
      password
    }
    const response = await login(data)
    console.log(response)
  }
  return (
    <div className='flex flex-col items-center mt-[200px] gap-6'>
      <h1 className='font-semibold text-[30px]'>Đăng nhập</h1>
      <p>Chưa có tài khoản? <Link to='/register' className='hover:underline'>Đăng ký ngay</Link></p>
      <div className='w-[300px]'>
        <label className='font-semibold'>Email</label>
        <InputField
          data={email}
          setData={setEmail}
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
      <div className='w-[300px]'>
        <Button
          name='Đăng nhập'
          onClick={handleLogin}
        />
      </div>
    </div>
  )
}

export default Login
