import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom/dist'
import { Button, InputField } from '../../components/public'
import { createReader, getAllReaderType } from '../../apis/Reader'
import { formatBirthDay } from '../../ultils/helpers'
import { toast } from 'react-toastify'

const Register = () => {
    const [readerName, setReaderName] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const [password, setPassword] = useState('')
    const [readerTypeId, setReaderTypeId] = useState(1)
    const [address, setAddress] = useState('')
    const [readerType, setReaderType] = useState([])
    const navigate = useNavigate()
    const handleRegister = async() => {
        if (email === '' || readerName === '' || birthday === '' || password === '' || readerTypeId === '' || address === '') {
            toast.error('Vui lòng nhập đầy đủ thông tin')
        } else {
            const data = {
                user_name: readerName,
                email: email,
                password: password,
                birthday: formatBirthDay(new Date(birthday)),
                reader_type_id: +readerTypeId,
                address: address

            }
            const response = await createReader(data)
            if (response.status === 200) {
                toast.success('Thêm độc giả thành công')
                navigate('/login')
            }
        }
    }
    const getReaderType = async () => {
        const response = await getAllReaderType()
        setReaderType(response.data)
    }
    useEffect(()=>{
        getReaderType()
    },[])
    return (
        <div className='flex flex-col items-center mt-[200px] gap-6'>
            <h1 className='font-semibold text-[30px]'>Đăng ký tài khoản</h1>
            <p>Đã có tài khoản? <Link to='/login' className='hover:underline'>Đăng nhập ngay</Link></p>
            <div className='w-[300px]'>
                            <label className='font-semibold'>Tên độc giả</label>
                            <input
                                type="text"
                                className='w-full p-2 border border-gray-300 rounded-md'
                                value={readerName}
                                onChange={(e) => setReaderName(e.target.value)}
                            />
                            <label className='font-semibold'>Ngày sinh</label><br />
                            <input className='border p-1 rounded-md' type="date" name="" id=""
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            /><br />
                            <label className='font-semibold' htmlFor="">Password</label>
                            <input
                                type="password"
                                className='w-full p-2 border border-gray-300 rounded-md'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className='font-semibold'>Email</label>
                            <input
                                type="text"
                                className='w-full p-2 border border-gray-300 rounded-md'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className='font-semibold'>Loại độc giả</label>
                            <select name="" id="" className='px-3 py-1' onChange={(e) => setReaderTypeId(e.target.value)}>
                                {readerType.length > 0 && readerType.map((item) => {
                                    return (
                                        <option value={item.reader_type_id}>{item.reader_type}</option>
                                    )
                                })}
                            </select><br />
                            <label className='font-semibold' htmlFor="">Địa chỉ</label>
                            <input
                                type="text"
                                className='w-full p-2 border border-gray-300 rounded-md'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
            <div className='w-[300px]'>
                <Button
                    name='Đăng ký'
                    onClick={() => handleRegister()}
                />
            </div>
        </div>
    )
}

export default Register
