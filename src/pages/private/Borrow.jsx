import React, { Fragment, useState } from 'react'
import { Button } from '../../components/public'
import { icons } from '../../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook } from '../../redux/appSlice'
import { toast } from 'react-toastify'
const Borrow = () => {
    const {CiCirclePlus}=icons
    const borrow = useSelector(state => state.app?.borrow)
    let quantity = borrow.reduce((total, item) => total + item.borrowedBook_quantity, 0)
    const dispatch = useDispatch()
    const handleDelete = (book_id)=>{
        dispatch(deleteBook(book_id))
        toast.success('Xóa sách khỏi phiếu mượn thành công!')
    }
    return (
        <div className='flex min-h-[650px]'>
            <div className='flex flex-col gap-12 w-1/2 p-6'>
                <div className='flex gap-4'>
                    <span className='text-[20px] font-semibold'>Số lượng sách</span>
                    <input type="text" value={quantity} disabled className='pl-6'/>
                </div>
                <div className='flex gap-8'>
                    <span className='text-[20px] font-semibold'>Ngày mượn</span>
                    <input type="date" value={Date.now()} className='w-[180px] pl-6' />
                </div>
                <div className='flex gap-16'>
                    <span className='text-[20px] font-semibold'>Ngày trả</span>
                    <input type="date" className='w-[180px] pl-6' />
                </div >
                <div className='flex gap-7'>
                    <span className='text-[20px] font-semibold'>Người mượn</span>
                    <input type="text" className='pl-6' />
                </div>
                <div className='flex gap-6'>
                    <span className='text-[20px] font-semibold'>Số điện thoại</span>
                    <input type="text" className='pl-6' />
                </div>
            </div>
            <div className='w-1/2 flex flex-col'>
                <div className='flex flex-col gap-2 p-2 bg-white'>
                    <h1 className='font-semibold mt-4 text-[24px] border-b pb-4 w-full text-center  '>Danh sách sách mượn</h1>
                    <div className='flex flex-col gap-4'>
                        {borrow.length > 0 && borrow.map((item) => {
                                quantity += item.borrowedBook_quantity
                            return(
                                <div key={item.book_id} className='flex justify-around'>
                                    <img src={`http://localhost:5000/api/image/get?id=${item.book_id}`} alt={item.title} className='w-[80px] h-[120px]' />
                                    <div className='flex gap-4 flex-col'>
                                        <div>
                                            <span>Mã sách: </span>
                                            <span>{item.book_title_id}</span>
                                        </div>
                                        <div>
                                            <span>Số lượng: </span>
                                            <span>{item.borrowedBook_quantity}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Button
                                            name='Xóa'
                                            style='bg-red-500 w-[150px] hover:bg-gray-500 text-white p-2 rounded-md'
                                            onClick={()=>handleDelete(item.book_id)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex gap-2 items-center my-4 '>
                        <CiCirclePlus size={24}/>
                        <span className='cursor-pointer hover:text-orange-400'>
                            Thêm sách mượn
                        </span>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <Button
                        name='Hủy'
                    />
                    <Button
                        name='Mượn sách'
                    />
                </div>
            </div>
        </div>
    )
}

export default Borrow