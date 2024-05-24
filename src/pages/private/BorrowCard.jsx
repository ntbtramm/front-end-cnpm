import React, { useEffect } from 'react'
import { getAllBorrow, getAllBorrowByUser } from '../../apis/Borrow'
import { icons } from '../../ultils/icons'
import { Button } from '../../components/public'
import { useNavigate } from 'react-router-dom'
import {formatTime} from '../../ultils/helpers'
import { useSelector } from 'react-redux'
const BorrowCard = () => {
  const {user} = useSelector(state=>state.app)
  const { FaRegTrashCan } = icons
  const [borrowCard, setBorrowCard] = React.useState([])
  const navigate = useNavigate()
  const getAllBorrowCard = async () => {
    const response = await getAllBorrow()
    setBorrowCard(response.data)
  }
  const getAllBorrowCardByUser = async () => {
    const response = await getAllBorrowByUser(user?.user_id)
    setBorrowCard(response.data)
  }
  useEffect(() => {
    if(user.is_admin){
      getAllBorrowCard()
    }
    else{
      getAllBorrowCardByUser()
    }
  }, [])
  const handleAddBorrowCard = () => {
    navigate('/borrow/add')
  }
  return (
    <div className='flex flex-col gap-12'>
      <div className='flex justify-between'>
      {/* <div className='flex gap-12'>
        <span>Ngày</span>
        <input type="date" />
      </div> */}
      {user.is_admin && <div className='flex justify-center'>
        <Button
          name='Thêm phiếu mượn'
          style='bg-blue-500 text-white p-2 rounded-md hover:bg-orange-500'
          onClick={handleAddBorrowCard}
        />
        </div>}
      
      </div>
      <div className='flex flex-col'>
        <span className='font-semibold text-[20px] mb-4'>Số phiếu: {borrowCard.length} </span>
        {borrowCard.length > 0 ? (
          <div className='flex flex-col gap-4'>
          {borrowCard.length > 0 && borrowCard.toReversed().map((item) => {
            return (
              <div 
                className='flex justify-between items-center bg-white p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-all'
                onClick={()=>{navigate('/borrow/'+item.lending_id)}}
                
              >
                <div className='flex gap-12'>
                  <span>Phiếu số: {item.lending_id}</span>
                  <span>Số sách mượn: {item.items.length}</span>
                  <span>Ngày mượn: {formatTime(new Date(item.lending_date))}</span>
                  <span>Ngày trả: {item.return_date ? formatTime(new Date(item.return_date)) : "Chưa trả"}</span>
                </div>
                <div>
                  {/* <FaRegTrashCan size={20} className='text-red-500 cursor-pointer' /> */}
                </div>
              </div>
            )
          })}
        </div>
        ): (
          <div className='text-center  text-[20px]'>
            <span>Người dùng <span className='font-semibold underline'>{user.user_name}</span> hiện tại chưa có phiếu mượn nào, vui lòng liên hệ ADMIN để được hổ trợ mượn sách</span>
          </div>
        ) }
      </div>   
    </div>
  )
}

export default BorrowCard