import React, { useEffect, useState } from 'react'
import { Button, InputField } from '../../components/public'
import { getallBook_Receipt } from '../../apis/BookReceipt'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BookReceiptModal } from '../../components/private'
import { configureStore } from '@reduxjs/toolkit'

const BookReceipts = () => {
    const [showModal, setShowModal] = useState(false)

    const [BookReceipt, setBookReceipt] = useState([])


    const getBook_re = async () => {
        return getallBook_Receipt().then((response) => {
            setBookReceipt(response.data)
        })
    }

    function OneReceipt(props) {
        return <div className='flex justify-between items-center bg-white p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-all'>
            <div className='flex gap-12'>
                <span>#{props.item.book_receipt_id}</span>
                <span>ngày nhập: {props.item.entry_date}</span>
                <ul>

                    {
                        props.item.items.length != 0 && props.item.items.map((i) => {
                            return (
                                <li>
                                    <span>book_id: {i.book_id}</span>
                                    &emsp;
                                    &emsp;
                                    <span>quantity: {i.quantity}</span>
                                    </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>;
    }


    useEffect(() => {
        getBook_re()
    }, [showModal])
    return (
        <div>
            {showModal && <BookReceiptModal setShowModal={setShowModal} />}
            <div className='flex flex-col gap-12'>
                <Button
                    name='Thêm Phiếu'
                    style='bg-black w-[180px] text-white rounded-2xl p-2 hover:text-gray-300'
                    onClick={() => { setShowModal(true) }}
                />
                <div className='flex flex-col'>
                    <span className='font-semibold text-[20px] mb-4'>Số phiếu: {BookReceipt.length}</span>
                    <div className='flex flex-col gap-4'>
                        {BookReceipt.length !== 0 && BookReceipt.toReversed().map((item) => <OneReceipt item={item} />)}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default BookReceipts