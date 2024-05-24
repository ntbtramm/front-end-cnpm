import React, { useEffect, useState } from 'react'

import { Button } from '../../components/public'
import { getAllReaderType, getAllReaders, getOneReaderType } from '../../apis/Reader'
import { CollectionModal, ReaderModal } from '../../components/private'
import { formatTime } from '../../ultils/helpers'
import { payPenalty, Delete_user, getOneUser } from '../../apis/User'
import { toast } from 'react-toastify'

const Reader = () => {
  const [reader, setReader] = useState([{}]);
  const [readerType, setReaderType] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [user_pt, set_user_pt] = useState([]);
  const [user_id, set_user_id] = useState(null);
  const [currentReader, setCurrentReader] = useState({});
  const [option, setOption] = useState('reader');
  const getReader = async () => {
    const response = await getAllReaders();
    setReader(response.data);

  }

  const handlept = async(id) => {
    const response = await getOneUser(id);
    set_user_pt(response.data);
    set_user_id(id);
  }
  const handleCancel = () =>{
    set_user_id(null);
  }
  const getReaderType = async () => {
    const response = await getAllReaderType();
    setReaderType(response.data);
  }
  const handlePayPenalty = async (data) => {
    const response = await payPenalty(data);
    if (response.status === 200) {
      getReader();
      toast.success('Trả nợ thành công');
    }
    else {
      toast.error('Trả nợ thất bại');
    }
  }

  const handleDelete_user = async (user_id) => {
    if (confirm('Are you sure?')) {

      const response = await Delete_user(user_id);
      if (response.status === 200) {
        getReader();
        toast.success('Xóa thành công');
      }
      else {
        toast.error('Xóa thất bại');
      }
    }

  }
  useEffect(() => {
    getReader();
    getReaderType();
  }, [showModal])
  // console.log(reader)
  return (
    <div>
      {showModal && <ReaderModal 
                      option={option} 
                      user_pt={user_pt} 
                      currentReader={currentReader} 
                      setShowModal={setShowModal} 
                    />}
      {showCollectionModal && <CollectionModal  user_pt={user_pt} 
                                                currentReader={currentReader}   
                                                setShowCollectionModal={setShowCollectionModal} 
                                                user_id={user_id}
                              />}
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
              <tr className=''>
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
                  <React.Fragment key={item.reader_id}>
                    <tr className=''>
                      <td className='px-6 py-4 text-center border-b'>{item.user_id}</td>
                      <td className='px-6 py-4 text-center border-b'>{item.user_name}</td>
                      <td className='px-6 py-4 text-center border-b'>{item.reader_type === null ? 'không có' : item.reader_type}</td>
                      <td className='px-6 py-4 text-center border-b'>{formatTime(new Date(item.created_at))}</td>
                      <td className='px-6 py-4 text-center border-b'>{formatTime(new Date(item.expiry_date))}</td>
                      <td className='px-6 py-4 text-center border-b'>{item.penalty_owed}</td>
                      <td className='flex justify-center items-center border-b '>
                        <button
                          className='p-1 w-[80px] bg-red-500 text-white rounded-md hover:bg-red-700' onClick={() => handleDelete_user(item.user_id)}>Xóa</button>
                        {item.penalty_owed > 0 && <button
                          className='p-1 ml-1 w-[80px] bg-cyan-500 text-white rounded-md hover:bg-cyan-700'
                          onClick={() => handlePayPenalty({ user_id: item.user_id, amount: prompt("nhập số tiền") })}
                        >Trả nợ</button>}
                        {item.penalty_owed > 0 && <button
                          className='p-1 ml-1 w-[80px] bg-cyan-500 text-white rounded-md hover:bg-cyan-700'
                          onClick={() =>{ handlept(item.user_id); setShowCollectionModal(true); setCurrentReader(item)}}
                        >Phiếu thu tiền</button>}
                      </td>
                    </tr>
                    {/* {item.user_id === user_id && (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center border-b">
                          <div className="flex flex-col items-center">
                            <div className="mb-4 text-lg font-medium">Thông tin phiếu thu tiền</div>
                            <div className="mb-2 text-base font-medium">
                              <label className="mr-4">Mã độc giả:</label>
                              <span>{item.user_id}</span>
                            </div>
                            {user_pt.fine_collections && user_pt.fine_collections.map((fine, index) => (
                              <div key={index} className="mb-2 text-base font-medium">
                                <label className="mr-4">Ngày lập phiếu:</label>
                                <span>{formatTime(new Date(fine.created_at))}</span>
                                <label className="ml-4 mr-4">Tiền thu:</label>
                                <span>{fine.amount}</span>
                              </div>
                            ))}
                            <div className="mb-2 text-base font-medium">
                              <label className="mr-4">Tổng nợ:</label>
                              <span>{item.penalty_owed}</span>
                            </div>
                            <button
                              className="w-[100px] py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 mt-4"
                              onClick={handleCancel}
                            >
                              Hủy
                            </button>
                          </div>
                        </td>
                      </tr>
                    )} */}
                  </React.Fragment>
                )
              })}
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
              <tr className=''>
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
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  )}
  

export default Reader