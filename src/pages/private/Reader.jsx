import React, { useEffect, useState } from 'react'

import { Button } from '../../components/public'
import { getAllReaders } from '../../apis/Reader'
import { ReaderModal } from '../../components/private'


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
  return (
    <div>
      {showModal && <ReaderModal setShowModal={setShowModal} />}
      <div className='w-[180px]'>
        <Button
          name='Thêm độc giả'
          onClick={() => { setShowModal(true) }}
        />
      </div>
      <table className='m-auto mt-6'>
        <thead className='p-4 mb-2'>
          <tr >
            <th className='px-12 text-[16px]'>Mã độc giả</th>
            <th className='px-12 text-[16px]'>Tên độc giả</th>
            <th className='px-12 text-[16px]'>Loại độc giả</th>
            <th className='px-12 text-[16px]'>Ngày lập thẻ</th>
            <th className='px-12 text-[16px]'>Ngày hết hạn</th>
            <th className='px-12 text-[16px]'>Tổng nợ</th>
            <th className='px-12 text-[16px]'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {reader.length > 0 && reader.map((item) => {
            return (
              <tr key={item.reader_id} className=''>
                <td className='px-12 text-center'>{item.user_id}</td>
                <td className='px-12 text-center'>{item.user_name}</td>
                <td className='px-12 text-center'>{item.reader_type===null?'không có':item.reader_type}</td>
                <td className='px-12 text-center'>{item.created_date}</td>
                <td className='px-12 text-center'>{item.expired_date}</td>
                <td className='px-12 text-center'>{item.total_debt}</td>
                <td className='px-12 text-center flex '>
                  <button className='mr-2 w-[80px] p-1 bg-blue-500 rounded-md'>Sửa</button>
                  <button className='p-1 bg-red-500 rounded-md  w-[80px]'>Xóa</button>
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