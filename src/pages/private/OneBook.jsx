import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import noImage from '../../assets/images/image.png'
import { oneBook_title_details, get_image_url, upload_book_image } from '../../apis/Books'
import { Button } from '../../components/public'
import { useDispatch } from 'react-redux'
import { borrowBook } from '../../redux/appSlice'
import { toast } from 'react-toastify'
import { BookModal, BookTitleModal } from '../../components/private'
import { useSelector } from 'react-redux'

const OneBook = () => {
  const { book_id } = useParams()

  const book_title_id = book_id

  const user = useSelector(state => state.app?.user)

  const [bookDetail, setBookDetail] = useState({})

  const [showModal, setShowModal] = useState(false)

  const [image, setimage] = useState()

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
  const handleFileChange = (e) => {
    if (e.target.files) {
      setimage(e.target.files[0]);
      console.log(e.target.files[0])
    }
  };


  const handleUploadClick = (book_title_id) => {
    if (!image) {
      return;
    }

    return upload_book_image(book_title_id, image).then((response) => {
      toast("success")
    }).catch((error) => {
      toast.error("upload failed")
    });
  };


  function Edition(props) {
    return <li><br /><span className='font-semibold'>Mã sách</span> #{props.item.book_id} <br /> publication year: {props.item.publication_year}<br /> publisher name: {props.item.publisher_name}<br /> available: {props.item.available} <br /> {user?.is_admin === true && props.item.available != 0 ? <Button
      name='Mượn sách'
      style='bg-black text-white p-2 rounded-2xl hover:text-gray-300 w-[180px]'
      onClick={() => handleBorrow(props.item.book_id)}
    /> : null}</li>;
  }

  useEffect(() => {
    getBook_details()
  }, [showModal])

  return (
    <div className='flex gap-12'>
      {showModal && <BookModal setShowModal={setShowModal} book_title_id={bookDetail.book_title_id} />}
      <div className='w-1/2 p-6'>
        <img src={get_image_url(bookDetail.image_id)} alt="" />
      </div>
      <div className='w-1/2 flex flex-col gap-12'>
        <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Mã tựa sách: </span>
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
        <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>Thể loại: </span>
          <span className='text-[24px]'>{bookDetail?.genre_name}</span>
        </div>


        {user?.is_admin === true && <div className='flex gap-3 items-center'>
          <span className='font-semibold text-[24px]'>image: </span>
          <input type="file" onChange={handleFileChange} />

          <button onClick={() => handleUploadClick(bookDetail.book_title_id)}>Upload</button>
        </div>}

        <div className='flex gap-3 items-bottom'>
          <h1>Editions: </h1>
          <ul>
            {bookDetail.editions?.map((item) => <Edition item={item} />)}
          </ul>

        </div>
          {user?.is_admin === true ? <Button
            name='Thêm phiên bản'
            style='bg-black w-[180px] text-white rounded-2xl p-2 hover:text-gray-300'
            onClick={() => { setShowModal(true) }}
          /> : <div className='w-[180px]'></div>
          }
      
      </div>
    </div>
  )
}

export default OneBook