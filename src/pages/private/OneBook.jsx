import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import noImage from '../../assets/images/image.png'
import { oneBook_title_details, get_image_url } from '../../apis/Books'
import { Button } from '../../components/public'
import { useDispatch } from 'react-redux'
import { borrowBook } from '../../redux/appSlice'
import { toast } from 'react-toastify'

const OneBook = () => {
  const { book_id } = useParams()

  const book_title_id = book_id

  const [bookDetail, setBookDetail] = useState({})

  const dispatch = useDispatch()

  const getBook_details = async () => {
    const response = await oneBook_title_details(book_title_id)
    setBookDetail(response.data)
  }

  const handleBorrow = (book_id) => {

    const borrowedBook = {
      book_id,
      quantity: 1
    }
    dispatch(borrowBook(borrowedBook))
    toast.success('Thêm sách vào phiếu mượn thành công!')

  }


  function Edition(props) {
    return <li><br />#{props.item.book_id} <br /> publication year: {props.item.publication_year}<br /> publisher name: {props.item.publisher_name}<br /> available: {props.item.available} <br /> {props.item.available != 0 ? <Button
      name='Mượn sách'
      style='bg-black text-white p-2 rounded-2xl hover:text-gray-300 w-[180px]'
      onClick={() => handleBorrow(props.item.book_id)}
    /> : null}</li>;
  }

  useEffect(() => {
    getBook_details()
  }, [])

  return (
    <div className='flex gap-12'>
      <div className='w-1/2 p-6'>
        <img src={get_image_url(bookDetail.image_id)} alt="" />
      </div>
      <div className='w-1/2 flex flex-col gap-12'>
        <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Mã sách: </span>
          <span className='text-[24px]'>{bookDetail?.book_title_id}</span>
        </div>
        <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Tên sách: </span>
          <span className='text-[24px]'>{bookDetail?.book_name}</span>
        </div>
        <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Tác giả: </span>
          {bookDetail?.authors?.map((item, index) => {
            return (
              <span key={index} className='text-[24px]'>{item.author_name} {bookDetail?.authors.length <= 1 ? "" : ", "}</span>
            )
          })}
        </div>
        {/* <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Giá: </span>
          <span className='text-[24px]'>{book?.price}</span>
        </div> */}
        <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Thể loại: </span>
          <span className='text-[24px]'>{bookDetail?.genre_name}</span>
        </div>


        {/* <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Năm xuất bản: </span>
          <span className='text-[24px]'>{book?.publication_year}</span>
        </div> */}
        {/* <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Nhà xuất bản: </span>
          <span className='text-[24px]'>{book?.publisher_name}</span>
        </div> */}
        {/* <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Số lượng: </span>
          <span className='text-[24px]'>{book?.quantity}</span>
        </div> */}
        {/* <div>
          <Button
            name='Mượn sách'
            style='bg-black text-white p-2 rounded-2xl hover:text-gray-300 w-[180px]'
            onClick={handleBorrow}
          />
        </div> */}
        <>
          <h1>Editions: </h1>
          <ul>
            {bookDetail.editions?.map((item) => <Edition item={item} />)}
          </ul>
        </>
      </div>
    </div>
  )
}

export default OneBook