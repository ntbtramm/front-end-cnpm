import React, { useState } from 'react'
import { Button, InputField } from '../../components/public'
import { icons } from '../../ultils/icons'
const Books = () => {
    const {IoIosSearch} =icons
    const [books,setBooks] = useState([])
    return (
        <div>
            <div className='flex justify-between items-center'>
                <Button
                    name='Thêm sách'
                    style='bg-black w-[180px] text-white rounded-2xl p-2 hover:text-gray-300'
                />
                <div className='flex items-center border bg-white border-gray-300 p-2 rounded-2xl mt-2'>
                    <IoIosSearch size={30}/>
                    <InputField
                        placeholder='Tìm kiếm sách...'
                        style='border-none px-2 py-1'
                    />
                </div>
            </div>
            <div className='grid'>

            </div>
        </div>
    )
}

export default Books