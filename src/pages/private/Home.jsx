import React from 'react'
import banner from '../../assets/images/banner.svg'
import { InputField } from '../../components/public'
import { icons } from '../../ultils/icons'
import book1 from '../../assets/images/book1.png'
import book2 from '../../assets/images/book2.png'
import book3 from '../../assets/images/book3.png'
import book4 from '../../assets/images/book4.png'
const Home = () => {
  const { IoIosSearch,IoIosArrowDown,FaArrowRight } = icons
  return (
    <>
      <div className='flex flex-col gap-12'>
        <div className='flex gap-12'>
          <img src={banner} alt="" />
          <div>
            <h2 className=' text-[18px] mb-6'>Tìm kiếm sách</h2>
            <div className=' bg-white rounded-md p-4 w-[600px]'>
              <div className='flex items-center gap-4'>
                <IoIosSearch size={40} color='gray'/>
                <InputField
                  placeholder='Tìm kiếm sách, tác giả, loại sách...'
                />
              </div>
              <div className='flex justify-between mt-6'>
                <span className='flex items-center'>Tên tác giả <IoIosArrowDown size={18}/></span>
                <span className='flex items-center'>Thể loại <IoIosArrowDown size={18}/></span>
                <span className='flex items-center'>Nhà xuất bản <IoIosArrowDown size={18}/></span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className=' text-[28px] mb-8 font-semibold'>Tác phẩm tiêu biểu</h2>
          <div className='flex items-center gap-4'>
              <div className='w-4/5 flex gap-12 '>
                <div className='flex flex-col gap-2'>
                  <img src={book1} alt="" />
                  <span className='text-[18px]'>Nora Roberts</span>
                  <span className='text-[#C0C0C0]'>Robe</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <img src={book2} alt="" />
                  <span className='text-[18px]'>Nora Roberts</span>
                  <span className='text-[#C0C0C0]'>Robe</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <img src={book3} alt="" />
                  <span className='text-[18px]'>Nora Roberts</span>
                  <span className='text-[#C0C0C0]'>Robe</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <img src={book4} alt="" />
                  <span className='text-[18px]'>Nora Roberts</span>
                  <span className='text-[#C0C0C0]'>Robe</span>
                </div>
              </div>
              <div className='w-1/5 flex flex-col items-center hover:underline cursor-pointer'>
                <FaArrowRight size={50}/>
                <span >Xem thêm</span>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home