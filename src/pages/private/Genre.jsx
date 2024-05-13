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
        <table className='m-auto'>
            <thead className='p-4 mb-2'>
                <tr >
                    <th className='px-12 text-[24px]'>Mã thể loại</th>
                    <th className='px-12 text-[24px]'>Tên thể loại</th>
                    <th className='px-12 text-[24px]'>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {genre.map((item,index)=>{
                    return(
                        <tr key={index} className=''>
                            <td className='px-12 text-center'>{item.genre_id}</td>
                            <td className='px-12 text-center'>{item.genre_name}</td>
                            <td className='px-12 text-center'>
                                <button className='mr-2 w-[80px] p-2 bg-blue-500 rounded-md'>Sửa</button>
                                <button className='p-2 bg-red-500 rounded-md  w-[80px]'>Xóa</button>
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