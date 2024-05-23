import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createBookReceipt } from '../../apis/BookReceipt'

const BookReceiptModal = (props) => {
    const { setShowModal, book_title_id } = props
    const [Book_ids,setBook_ids] = useState([])
    const [Quantities,setQuantities] = useState([])

    const handleBookImport = async() =>{
        if(Book_ids.split(" ").length===0 || Book_ids.split(" ").length != Quantities.split(" ").length){
            toast.error('Vui lòng nhập đầy đủ các trường!')
        }
        else{
            const data={
                book_ids:Book_ids.split(" "),
                quantities: Quantities.split(" ")
            }

            console.log(data)

            return createBookReceipt(data).then((response)=>{
                setShowModal(false)
                toast.success('Thêm sách thành công')
            }).error((error)=>{
                toast.success('Thêm sách không thành công')

            })
        }
    }
    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-12'>
            <h1 className='font-semibold text-[30px]'>Nhập sách mới</h1>
                <div className='w-[300px]'> 
                    <label className='font-semibold'>Danh sách mã phiên bản sách (Book_id, cách nhau bởi dấu cách)</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={Book_ids}
                        onChange={(e) => setBook_ids(e.target.value)}
                    />
                </div>

                <div className='w-[300px]'> 
                    <label className='font-semibold'>Số lượng mỗi cuốn sách (cách nhau bởi dấu cách)</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={Quantities}
                        onChange={(e) => setQuantities(e.target.value)}
                    />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                    <button className='p-2 bg-blue-500 text-white rounded-md' onClick={handleBookImport}>Xác nhận</button>
                    <button className='p-2 bg-red-500 text-white rounded-md' onClick={() => setShowModal(false)}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default BookReceiptModal