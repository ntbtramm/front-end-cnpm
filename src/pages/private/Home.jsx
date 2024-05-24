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
import { getAllAuthors } from '../../apis/Author'

import { get_n_newest_book, get_image_url } from '../../apis/Books'
import { useSelector } from 'react-redux'

const Home = () => {
  const { IoIosSearch, IoIosArrowDown, FaArrowRight, FaHandPeace } = icons
  const { user } = useSelector(state => state.app)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [newest_books, setnewest_books] = useState([])

  const author = getAllAuthors

  const handlepress = async (e) => {
    if (e.key === 'enter') {

    }
  }

  const get_newest_books = async () => {
    const response = await get_n_newest_book(4)
    setnewest_books(response.data)
  }
  const get_authors = (author_list, max_length = 10) => {
    let authors = []
    for (let i = 0; i < author_list.length; i++) {
      authors.push(
        author_list[i]["author_name"]
      )
    }
    return authors.join(', ').substring(0, max_length);
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
            <h2 className=' text-[24px] font-semibold mb-6'>HOME PAGE</h2>
            <div className='flex flex-col  rounded-md p-4 w-[600px]'>
              <span className='text-[40px] flex items-center gap-4'>Xin chào <span className='font-semibold underline'>{user.user_name}</span>  <FaHandPeace color='orange' size={48} /></span>
              <span className='text-[40px]'>Chúc một ngày mới tốt lành !</span>
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
                      <img src={get_image_url(item.image_id)} alt="item.book_name" className='w-[220px] h-[300px] object-cover' />
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