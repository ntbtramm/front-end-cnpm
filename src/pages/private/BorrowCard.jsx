import React, { useEffect } from 'react'
import { getAllBorrow } from '../../apis/Borrow'

const BorrowCard = () => {
  const [borrowCard, setBorrowCard] = React.useState([])
  const getAllBorrowCard = async () => {
    const response = await getAllBorrow()
    setBorrowCard(response.data)
  }
  useEffect(()=>{
    getAllBorrowCard()
  },[])
  return (
    <div className='flex flex-col gap-12'>
        <div className='flex gap-12'>
            <span>Ngày</span>
            <input type="date" />
        </div>
        <div className='flex flex-col'>
            <span>Số phiếu </span>
            {borrowCard.length>0 && borrowCard.map((item)=>{
              return (
                <div className='flex gap-12'>
                  <span>{item.borrow_id}</span>
                  <span>{item.borrow_date}</span>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default BorrowCard