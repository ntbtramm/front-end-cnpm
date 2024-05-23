import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { returnBook } from '../../apis/Return'
import {formatTime} from '../../ultils/helpers'
import { useNavigate } from 'react-router-dom'
const ReturnModal = (props) => {
    const { setShowModal,id,borrow } = props
    const navigate = useNavigate()
    const handleReturnBook = async() =>{
        const response = await returnBook(id)
        if(response.status === 200){
            toast.success('Trả sách thành công')
            setShowModal(false)
            navigate('/borrow')
        }else{
            toast.error('Trả sách thất bại')
        }
    }
    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-12'>
                <h1 className='font-semibold text-[30px] text-center mb-4'>Trả sách</h1>
                <div className='w-[300px]'>
                    <label className='font-semibold'>Mã phiếu mượn: </label>
                    <span>{borrow.lending_id}</span>
                </div>
                <div className='w-[300px]'>
                    <label className='font-semibold'>Ngày trả: </label>
                    <span>
                        {formatTime(new Date(Date.now()))}
                    </span>
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                    <button className='p-2 bg-blue-500 text-white rounded-md' onClick={() => handleReturnBook()}>Xác nhận</button>
                    <button className='p-2 bg-red-500 text-white rounded-md' onClick={() => setShowModal(false)}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default ReturnModal