import React from 'react'

const BorrowCard = () => {
  return (
    <div className='flex flex-col gap-12'>
        <div className='flex gap-12'>
            <span>Ngày</span>
            <input type="date" />
        </div>
        <div className='flex flex-col'>
            <span>Số phiếu </span>
            {}
        </div>
    </div>
  )
}

export default BorrowCard