import React, { useEffect, useState } from 'react'
import { Button, InputField } from '../../components/public'
import { icons } from '../../ultils/icons'
import { allBooks } from '../../apis/Books'
import noImage from '../../assets/images/image.png'
import { Link } from 'react-router-dom'
const Books = () => {
    const { IoIosSearch } = icons
    const [books, setBooks] = useState([])
    const getAllBooks = async () => {
        const response = await allBooks()
        setBooks(response.data)
    }
    useEffect(() => {
        getAllBooks()
    }, [])
    return (
        <div>
            <div className='flex justify-between items-center'>
                <Button
                    name='Thêm sách'
                    style='bg-black w-[180px] text-white rounded-2xl p-2 hover:text-gray-300'
                />
                <div className='flex items-center border bg-white border-gray-300 p-2 rounded-2xl mt-2'>
                    <IoIosSearch size={30} />
                    <InputField
                        placeholder='Tìm kiếm sách...'
                        style='border-none px-2 py-1'
                    />
                </div>
            </div>
            <div className='grid grid-cols-4 mt-8'>
                {books.length > 0 && books.map((item) => {
                    return (
                        <Link to={`/books/${item.book_id}`}>
                            <div key={item.book_id} className='flex flex-col items-center gap-2 p-4 bg-white m-4'>
                                <img src={item.image ? item.image : noImage} alt={item.title} className='w-[150px] h-[200px]' />
                                <span>Mã sách: {item.book_title_id}</span>
                                <span>Giá: {item.price}</span>
                                <span>Năm xuất bản {item.publication_year}</span>
                                <span className='text-[12px]'>Nhà xuất bản: {item.publisher_name}</span>
                                <span>Số lượng: {item.quantity}</span>
                                {/* <div className='flex gap-4'>
                                <Button
                                    name='Sửa'
                                    style='bg-blue-500 text-white p-2 rounded-md'
                                />
                                <Button
                                    name='Xóa'
                                    style='bg-red-500 text-white p-2 rounded-md'
                                />
                            </div> */}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Books