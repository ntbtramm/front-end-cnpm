import React, { useEffect, useState } from 'react'

import { Button } from '../../components/public'
import { getAllAuthors } from '../../apis/Author'
import { AuthorModal } from '../../components/private'


const Author = () => {
    const [author,setAuthor]=useState([])
    const [showModal,setShowModal]=useState(false)
    const getAuthor = async()=>{
        const response = await getAllAuthors()
        setAuthor(response.data)
    }
    useEffect(()=>{
        getAuthor()
    },[showModal])

  return (
    <div>
        {showModal && <AuthorModal setShowModal={setShowModal}/> }
        <div className='w-[180px]'>
        <Button
            name='Thêm tác giả'
            onClick={()=>{setShowModal(true)}}
        />
        </div>
        <table className='m-auto'>
            <thead className='p-4 mb-2'>
                <tr >
                    <th className='px-12 text-[24px]'>Mã tác giả</th>
                    <th className='px-12 text-[24px]'>Tên tác giả</th>
                    <th className='px-12 text-[24px]'>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {author.map((item,index)=>{
                    return(
                        <tr key={index} className=''>
                            <td className='px-12 text-center'>{item.author_id}</td>
                            <td className='px-12 text-center'>{item.author_name}</td>
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

export default Author