import React, { useEffect, useState } from 'react'
import banner from '../../assets/images/banner.svg'
import { InputField } from '../../components/public'
import { icons } from '../../ultils/icons'
import book1 from '../../assets/images/book1.png'
import book2 from '../../assets/images/book2.png'
import book3 from '../../assets/images/book3.png'
import book4 from '../../assets/images/book4.png'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { get_n_newest_book, get_image_url } from '../../apis/Books'

const Home = () => {
  const { IoIosSearch, IoIosArrowDown, FaArrowRight } = icons
  const navigate = useNavigate()

  const [newest_books, setnewest_books] = useState([])

  const get_newest_books = async () => {
    const response = await get_n_newest_book(4)
    setnewest_books(response.data)
  }
  const get_authors = (author_list, max_length=10) => {
    let authors = []
    for (let i = 0; i < author_list.length; i++) {
      authors.push(
        author_list[i]["author_name"]
      )
    }
    return authors.join(', ').substring(0,max_length);
  }


  useEffect(() => {
    get_newest_books()
  }, [])
  return (
    <>
      <div className='flex flex-col gap-12'>
        <div className='flex gap-12'>
          <img src={banner} alt="" />
          <div>
            <h2 className=' text-[18px] mb-6'>Tìm kiếm sách</h2>
            <div className=' bg-white rounded-md p-4 w-[600px]'>
              <div className='flex items-center gap-4'>
                <IoIosSearch size={40} color='gray' />
                <InputField
                  placeholder='Tìm kiếm sách, tác giả, loại sách...'
                />
              </div>
              <div className='flex justify-between mt-6'>
                <span className='flex items-center gap-1'>Tên tác giả <IoIosArrowDown size={18} /></span>
                <span className='flex items-center gap-1'>Thể loại <IoIosArrowDown size={18} /></span>
                <span className='flex items-center gap-1'>Nhà xuất bản <IoIosArrowDown size={18} /></span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className=' text-[28px] mb-8 font-semibold'>Tác phẩm tiêu biểu</h2>
          <div className='flex items-center gap-4 px-2'>
            {
              newest_books.map((item) => {
                return (
                  <Link to={`/books/${item.book_title_id}`}>
                    <div key={item.book_title_id} className='flex flex-col gap-2'>
                      <img src={get_image_url(item.image_id)} alt="item.book_name" />
                      <span className='text-[18px]'>{item.book_name}</span>
                      <span className='text-[#C0C0C0]'>{get_authors(item.authors)}</span>
                    </div>
                  </Link>
                )
              })
            }
            <div className='w-1/5 flex flex-col items-center hover:underline cursor-pointer' onClick={() => navigate('/books')}>
              <FaArrowRight size={50} />
              <span >Xem thêm</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home