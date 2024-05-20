import React, { useEffect, useState } from 'react'

import { Button } from '../../components/public'
import { getAllReaderType, getAllReaders } from '../../apis/Reader'
import { ReaderModal } from '../../components/private'
import { formatTime } from '../../ultils/helpers'
import { payPenalty } from '../../apis/User'
import { toast } from 'react-toastify'

const Reader = () => {
  const [reader, setReader] = useState([{}])
  const [readerType, setReaderType] = useState([{}])
  const [showModal, setShowModal] = useState(false)
  const [option, setOption] = useState('reader')
  const getReader = async () => {
    const response = await getAllReaders()
    setReader(response.data)
  }
  const getReaderType = async () => {
    const response = await getAllReaderType()
    setReaderType(response.data)
  }
  const handlePayPenalty = async (data) => {
    const response = await payPenalty(data)
    if (response.status === 200) {
      getReader()
      toast.success('Trả nợ thành công')
    }
    else {
      toast.error('Trả nợ thất bại')
    }
  }
  useEffect(() => {
    if (option === 'reader') {
      getReader()
    }
    else if (option === 'readerType') {
      getReaderType()
    }
  }, [showModal])
  return (
    <div>
      {showModal && <ReaderModal option={option} setShowModal={setShowModal} />}
      <div className='flex items-center justify-center gap-4'>
        <div
          className={`w-[180px] text-center bg-gray-100 p-2 rounded-md cursor-pointer ${option === 'reader' && 'text-orange-500'}`}
          onClick={() => { setOption('reader') }}
        >Độc giả</div>
        <div
          className={`w-[180px] text-center bg-gray-100 p-2 rounded-md cursor-pointer ${option === 'readerType' && 'text-orange-500'}`}
          onClick={() => { setOption('readerType') }}
        >Loại độc giả</div>
      </div>
      {option === 'reader' && (
        <>
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
                    <td className='px-6 py-4 text-center border-b'>{item.reader_type === null ? 'không có' : item.reader_type}</td>
                    <td className='px-6 py-4 text-center border-b'>{formatTime(new Date(item.created_at))}</td>
                    <td className='px-6 py-4 text-center border-b'>{formatTime(new Date(item.expiry_date))}</td>
                    <td className='px-6 py-4 text-center border-b'>{item.penalty_owed}</td>
                    <td className='flex justify-center items-center border-b '>
                      <button className='mr-2 w-[80px] p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700'>Sửa</button>
                      <button className='p-1 w-[80px] bg-red-500 text-white rounded-md hover:bg-red-700'>Xóa</button>
                      {item.penalty_owed > 0 && <button
                        className='p-1 ml-1 w-[80px] bg-cyan-500 text-white rounded-md hover:bg-cyan-700'
                        onClick={() => handlePayPenalty({ user_id: item.user_id, amount: item.penalty_owed })}
                      >Trả nợ</button>}
                    </td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </>
      )}
      {option === 'readerType' && (
        <>
          <div className='w-[180px]'>
            <Button
              name='Thêm loại độc giả'
              onClick={() => { setShowModal(true) }}
            />
          </div>
          <table className='m-auto mt-6 w-full border-collapse shadow-lg '>
            <thead className='bg-gray-100  border-gray-300'>
              <tr className='' >
                <th className='px-6 py-4 text-[16px] font-medium'>Tên loại độc giả</th>
                <th className='px-6 py-4 text-[16px] font-medium'>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {readerType.length > 0 && readerType.map((item) => {
                return (
                  <tr key={item.reader_id} className=''>
                    <td className='px-6 py-4 text-center border-b'>{item.reader_type}</td>
                    <td className='px-6 py-4 text-center border-b'>
                      <button className='mr-2 w-[80px] p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700'>Sửa</button>
                      <button className='p-1 w-[80px] bg-red-500 text-white rounded-md hover:bg-red-700'>Xóa</button>
                    </td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default Reader