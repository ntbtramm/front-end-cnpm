import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createBook } from '../../apis/Books'
const BookModal = (props) => {
    const { setShowModal, book_title_id } = props
    const [publicationYear,setPublicationYear] = useState()
    const [publisherId,setPublisherId] = useState()
    const [price,setPrice] = useState()

    const handleAddBook = async() =>{
        if(!publicationYear || !publisherId || !price){
            toast.error('Vui lòng nhập đầy đủ các trường!')
        }
        else{
            const data={
                book_title_id:book_title_id,
                publication_year: publicationYear,
                publisher_id: publisherId,
                price: price
            }
            const response = await createBook(data)
            if(response.status===200){
                toast.success('Thêm sách thành công')
                setShowModal(false)
            }
        }
    }
    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-12'>
            <h1 className='font-semibold text-[30px]'>Thêm sách mới</h1>
                <div className='w-[300px]'> 
                    <label className='font-semibold'>Năm phát hành</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={publicationYear}
                        onChange={(e) => setPublicationYear(e.target.value)}
                    />
                </div>
                <div className='w-[300px]'> 
                    <label className='font-semibold'>Mã nhà phát hành</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={publisherId}
                        onChange={(e) => setPublisherId(e.target.value)}
                    />
                </div>
                <div className='w-[300px]'> 
                    <label className='font-semibold'>Giá</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                    <button className='p-2 bg-blue-500 text-white rounded-md' onClick={handleAddBook}>Xác nhận</button>
                    <button className='p-2 bg-red-500 text-white rounded-md' onClick={() => setShowModal(false)}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default BookModal