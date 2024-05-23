import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneBorrow } from '../../apis/Borrow'
import { Button } from '../../components/public'
import { BorrowModal, ReturnModal } from '../../components/private'
import { returnBook } from '../../apis/Return'
import { toast } from 'react-toastify'
import {formatTime} from '../../ultils/helpers'
const BorrowDetail = () => {
    const { id } = useParams()
    const [borrow, setBorrow] = React.useState({})
    const [showModal, setShowModal] = React.useState(false)
    const navigate = useNavigate()
    const getBorrowData = async () => {
        const response = await getOneBorrow(id)
        setBorrow(response.data)
    }
    
    useEffect(() => {
        getBorrowData()
    }, [showModal])
    return (    
        <>
            {showModal && <ReturnModal setShowModal={setShowModal} id={id} borrow={borrow} />}
            <div className='flex flex-col gap-4'>
                <span className='font-semibold text-[24px]'>Phiếu mượn số: {borrow.lending_id} </span>
                <span>Ngày mượn: {formatTime(new Date(borrow.lending_date))}</span>
                <span>Hạn trả sách: {formatTime(new Date(borrow.return_deadline))}</span>
                <span>Mã người mượn: {borrow.user_id}</span>
                {borrow.return_date ? <span>Ngày trả sách: {formatTime(new Date(borrow.return_date))}</span> : <span className='font-semibold text-[18px]'>Tình trạng: Chưa trả sách</span>}
                <div className='my-4'>
                    <span className='font-semibold text-[20px] mb-8'>Danh sách sách mượn</span>
                    <div className='flex flex-col gap-4 mt-4'>
                        {borrow.items && borrow.items.map((item) => {
                            return (
                                <div className='flex gap-4 bg-white p-3 rounded-md'>
                                    <span className='font-semibold text-[17px]'>Mã sách: {item.book_id}</span>
                                    <span>Số lượng: {item.quantity}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='flex gap-6'>
                    <div>
                        <Button
                            name='Quay lại'
                            style='bg-red-500 text-white p-2 rounded-md hover:bg-gray-500'
                            onClick={() => { navigate('/borrow') }}
                        />
                    </div>
                    {!borrow.return_date && <div className='flex items-center w-[250px]'>
                        <Button
                            name='Trả sách'
                            style='bg-blue-500 text-white p-2 rounded-md hover:bg-orange-500'
                            onClick={() => { setShowModal(true) }}
                        />
                    </div>}
                </div>
            </div>
        </>
    )
}

export default BorrowDetail