import React from 'react'
import { Button } from '../../components/public'
import { icons } from '../../ultils/icons'
const Borrow = () => {
    const {CiCirclePlus}=icons
    return (
        <div className='flex min-h-[650px]'>
            <div className='flex flex-col gap-12 w-1/2 p-6'>
                <div className='flex gap-4'>
                    <span>Số lượng sách</span>
                    <input type="text" />
                </div>
                <div className='flex gap-4'>
                    <span>Ngày mượn</span>
                    <input type="date" value={Date.now()} />
                </div>
                <div className='flex gap-4'>
                    <span>Ngày trả</span>
                    <input type="date" />
                </div >
                <div className='flex gap-4'>
                    <span>Người mượn</span>
                    <input type="text" />
                </div>
                <div className='flex gap-4'>
                    <span>Số điện thoại</span>
                    <input type="text" />
                </div>
            </div>
            <div className='w-1/2 flex flex-col'>
                <div className='flex flex-col gap-2 p-2 bg-white'>
                    <h1 className='font-semibold mt-4 text-[20px] border-b pb-4 w-full text-center  '>Danh sách sách mượn</h1>
                    <div>

                    </div>
                    <div className='flex gap-2 items-center cursor-pointer hover:text-orange-400'>
                        <CiCirclePlus size={24}/>
                        <span>
                            Thêm sách mượn
                        </span>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <Button
                        name='Hủy'
                    />
                    <Button
                        name='Mượn sách'
                    />
                </div>
            </div>
        </div>
    )
}

export default Borrow