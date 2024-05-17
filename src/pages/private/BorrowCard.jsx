import React, { useEffect } from 'react'
import { getAllBorrow } from '../../apis/Borrow'
import { icons } from '../../ultils/icons'
import { Button } from '../../components/public'
import { useNavigate } from 'react-router-dom'
const BorrowCard = () => {
  const { FaRegTrashCan } = icons
  const [borrowCard, setBorrowCard] = React.useState([])
  const navigate = useNavigate()
  const getAllBorrowCard = async () => {
    const response = await getAllBorrow()
    setBorrowCard(response.data)
  }
  useEffect(() => {
    getAllBorrowCard()
  }, [])
  const handleAddBorrowCard = () => {
    navigate('/borrow/add')
  }
  return (
    <div className='flex flex-col gap-12'>
      <div className='flex justify-between'>
      <div className='flex gap-12'>
        <span>Ngày</span>
        <input type="date" />
      </div>
      <div className='flex justify-center'>
        <Button
          name='Thêm phiếu mượn'
          style='bg-blue-500 text-white p-2 rounded-md hover:bg-orange-500'
          onClick={handleAddBorrowCard}
        />
      </div>
      </div>
      <div className='flex flex-col'>
        <span className='font-semibold text-[20px] mb-4'>Số phiếu: {borrowCard.length} </span>
        <div className='flex flex-col gap-4'>
          {borrowCard.length > 0 && borrowCard.map((item) => {
            return (
              <div 
                className='flex justify-between items-center bg-white p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-all'
                onClick={()=>{navigate('/borrow/'+item.lending_id)}}
                
              >
                <div className='flex gap-12'>
                  <span>Phiếu số: {item.lending_id}</span>
                  <span>Số sách mượn: {item.items.length}</span>
                  <span>Ngày mượn: {item.lending_date}</span>
                  <span>Ngày trả: {item.return_date ? item.return_date : "Chưa trả"}</span>
                </div>
                <div>
                  <FaRegTrashCan size={20} className='text-red-500 cursor-pointer' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
    </div>
  )
}

export default BorrowCard