import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createReader, createReaderType, getAllReaderType } from '../../apis/Reader'
import { formatBirthDay, formatTime } from '../../ultils/helpers'
const CollectionModal = (props) => {
    const { setShowCollectionModal, option, user_pt, currentReader } = props
    const handleAddReader = async () => {
        if(option === 'reader'){
            if (email === '' || readerName === '' || birthday === '' || password === '' || readerTypeId === '' || address === '') {
                toast.error('Vui lòng nhập đầy đủ thông tin')
            } else {
                const data = {
                    user_name: readerName,
                    email: email,
                    password: password,
                    birthday: formatBirthDay(new Date(birthday)),
                    reader_type_id: +readerTypeId,
                    address: address
    
                }
                const response = await createReader(data)
                if (response.status === 200) {
                    setShowModal(false)
                    toast.success('Thêm độc giả thành công')
                }
            }
        }
        else if(option==='readerType'){
            const data = {
                reader_type: readerTypeName
            }
            const response = await createReaderType(data)
            if(response.status===200){
                setShowModal(false)
                toast.success('Thêm loại độc giả thành công')
            }
        }
    }
    const getReaderType = async () => {
        const response = await getAllReaderType()
        setReaderType(response.data)
    }
    useEffect(() => {
        if(option === ' reader'){
            getReaderType()
        }
    }, [])
    return (
        <div>
                <>
                    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'></div>
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-12'>
                        <h1 className='font-semibold text-[30px] text-center'>Thông tin phiếu thu tiền</h1>
                        <td colSpan="3" className="px-6 py-4 text-center border-b">
                          <div className="flex flex-col items-center">
                            <div className="mb-2 text-base font-medium">
                              <label className="mr-4">Mã độc giả:</label>
                              <span>{currentReader.user_id}</span>
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
                              <span>{currentReader.penalty_owed}</span>
                            </div>
                          </div>
                        </td>
                        <div className='flex justify-end gap-4 mt-6'>
                            <button className='p-4 bg-red-500 text-white rounded-md' onClick={() => setShowCollectionModal(false)}>Hủy</button>
                        </div>
                    </div>
                </>
        </div>
    )
}

export default CollectionModal