import React, { useEffect, useState } from 'react'

import { Button } from '../../components/public'
import { getAllReaders } from '../../apis/Reader'
import { ReaderModal } from '../../components/private'
import {formatTime} from '../../ultils/helpers'

const Reader = () => {
  const [reader, setReader] = useState([{}])
  const [showModal, setShowModal] = useState(false)
  const getReader = async () => {
    const response = await getAllReaders()
    setReader(response.data)
  }
  useEffect(() => {
    getReader()
  }, [])
  console.log(reader)
  return (
    <div>
      {showModal && <ReaderModal setShowModal={setShowModal} />}
      <div className='w-[180px]'>
        <Button
          name='Thêm độc giả'
          onClick={() => { setShowModal(true) }}
        />
      </div>
      <table className='m-auto mt-6 w-full border-collapse shadow-lg '>
        <thead className='bg-gray-100  border-gray-300'>
          <tr className='' >
            <th className='px-6 py-4 text-[16px] font-medium'>Mã độc giả</th>
            <th className='px-6 py-4 text-[16px] font-medium'>Tên độc giả</th>
            <th className='px-6 py-4 text-[16px] font-medium'>Loại độc giả</th>
            <th className='px-6 py-4 text-[16px] font-medium'>Ngày lập thẻ</th>
            <th className='px-6 py-4 text-[16px] font-medium'>Ngày hết hạn</th>
            <th className='px-6 py-4 text-[16px] font-medium'>Tổng nợ</th>
            <th className='px-6 py-4 text-[16px] font-medium'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {reader.length > 0 && reader.map((item) => {
            return (
              <tr key={item.reader_id} className=''>
                <td className='px-6 py-4 text-center border-b'>{item.user_id}</td>
                <td className='px-6 py-4 text-center border-b'>{item.user_name}</td>
                <td className='px-6 py-4 text-center border-b'>{item.reader_type===null?'không có':item.reader_type}</td>
                <td className='px-6 py-4 text-center border-b'>{formatTime(new Date(item.created_at))}</td>
                <td className='px-6 py-4 text-center border-b'>{formatTime(new Date(item.expiry_date))}</td>
                <td className='px-6 py-4 text-center border-b'>{item.penalty_owed}</td>
                <td className='flex justify-center items-center border-b '>
                  <button className='mr-2 w-[80px] p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700'>Sửa</button>
                  <button className='p-1 w-[80px] bg-red-500 text-white rounded-md hover:bg-red-700'>Xóa</button>
                  {item.penalty_owed >0 && <button className='p-1 w-[80px] bg-cyan-500-500 text-white rounded-md hover:bg-cyan-700'>Trả nợ</button>}
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Reader