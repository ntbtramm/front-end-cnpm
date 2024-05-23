import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createBookTitle } from '../../apis/Books'

const BookTitleModal = (props) => {
    const { setShowModal } = props

    const [Book_name,setBook_name] = useState()
    const [Genre_id,setGenre_id] = useState()
    const [Author_ids,setAuthor_ids] = useState([])

    const handleAddBookTitle = () =>{
        if(!Book_name || !Genre_id || !Author_ids){
            toast.error('Vui lòng nhập đầy đủ các trường!')
        }
        else{
            const data={
                book_name:Book_name,
                genre_id: Genre_id,
                author_ids: Author_ids.split(" ").map(Number)
            }
            console.log(data)

            return createBookTitle(data).then((response)=>{
                setShowModal(false)
                toast.success('Thêm sách thành công')
            }).catch((error)=>{
                toast.error('Thêm sách không thành công')
            })
        }
    }
    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-12'>
            <h1 className='font-semibold text-[30px]'>Thêm sách mới</h1>
                <div className='w-[300px]'> 
                    <label className='font-semibold'>Tên sách</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={Book_name}
                        onChange={(e) => setBook_name(e.target.value)}
                    />
                </div>
                <div className='w-[300px]'> 
                    <label className='font-semibold'>Mã thể loại</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={Genre_id}
                        onChange={(e) => setGenre_id(e.target.value)}
                    />
                </div>
                <div className='w-[300px]'> 
                    <label className='font-semibold'>Mã tác giả (cách nhau bởi dấu cách)</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={Author_ids}
                        onChange={(e) => setAuthor_ids(e.target.value)}
                    />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                    <button className='p-2 bg-blue-500 text-white rounded-md' onClick={handleAddBookTitle}>Xác nhận</button>
                    <button className='p-2 bg-red-500 text-white rounded-md' onClick={() => setShowModal(false)}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default BookTitleModal