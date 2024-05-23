import React, { useEffect, useState } from 'react'
import { getAllGenre } from '../../apis/Genre'
import { Button } from '../../components/public'
import GenreModal from '../../components/private/GenreModal'

const Genre = () => {
    const [genre,setGenre]=useState([])
    const [showModal,setShowModal]=useState(false)
    const getGenre = async()=>{
        const response = await getAllGenre()
        setGenre(response.data)
    }
    useEffect(()=>{
        getGenre()
    },[showModal])

  return (
    <div>
        {showModal && <GenreModal setShowModal={setShowModal}/> }
        <div className='w-[180px]'>
        <Button
            name='Thêm thể loại'
            onClick={()=>{setShowModal(true)}}
        />
        </div>
        <table className='m-auto mt-6 w-full border-collapse shadow-lg'>
            <thead className='bg-gray-100  border-gray-300'>
                <tr >
                    <th className='px-6 py-4 text-[16px] font-medium'>Mã thể loại</th>
                    <th className='px-6 py-4 text-[16px] font-medium'>Tên thể loại</th>
                    <th className='px-6 py-4 text-[16px] font-medium'>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {genre.map((item,index)=>{
                    return(
                        <tr key={index} className=''>
                            <td className='px-6 py-4 text-center border-b'>{item.genre_id}</td>
                            <td className='px-6 py-4 text-center border-b'>{item.genre_name}</td>
                            <td className='px-6 py-4 text-center border-b'>
                                <button className='mr-2 w-[80px] p-1 bg-blue-500 text-white rounded-md hover:bg-blue-700'>Sửa</button>
                                <button className='p-1 w-[80px] bg-red-500 text-white rounded-md hover:bg-red-700'>Xóa</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Genre