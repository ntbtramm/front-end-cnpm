import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createReader, getAllReaderType } from '../../apis/Reader'
import {formatBirthDay} from '../../ultils/helpers'
const ReaderModal = (props) => {
    const { setShowModal } = props
    const [readerType, setReaderType] = useState([])
    const [readerName, setReaderName] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const [password, setPassword] = useState('')
    const [readerTypeId, setReaderTypeId] = useState(1)
    const [address, setAddress] = useState('')
    const handleAddReader = async () => {
        if (email==='' || readerName === '' || birthday === '' || password === '' || readerTypeId === '' || address === '') {
            toast.error('Vui lòng nhập đầy đủ thông tin')
        } else {
            const data = {
                // reader_id: readerId,
                user_name: readerName,
                email: email,
                password: password,
                birthday: formatBirthDay(new Date(birthday)),
                reader_type_id: +readerTypeId,
                address: address

            }
            const response = await createReader(data)
            if (response.status === 200) {
                setShowModal(false)
                toast.success('Thêm độc giả thành công')
            }
        }
    }
    const getReaderType = async()=>{
        const response = await getAllReaderType()
        setReaderType(response.data)
    }
    useEffect(()=>{
        getReaderType()
    },[])
    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-12'>
                <h1 className='font-semibold text-[30px]'>Thêm độc giả</h1>
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
                        type="text" 
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
                    <select name="" id="" className='px-3 py-1' onChange={(e)=>setReaderTypeId(e.target.value)}>
                        {readerType.length>0 && readerType.map((item)=>{
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
                <div className='flex justify-end gap-4 mt-6'>
                    <button className='p-4 bg-blue-500 text-white rounded-md' onClick={() => handleAddReader()}>Thêm</button>
                    <button className='p-4 bg-red-500 text-white rounded-md' onClick={() => setShowModal(false)}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default ReaderModal