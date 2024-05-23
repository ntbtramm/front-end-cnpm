import React, { useState } from 'react'
import { createGenre } from '../../apis/Genre'
import { toast } from 'react-toastify'

const GenreModal = (props) => {
    const { setShowModal } = props
    const [genreName, setGenreName] = useState('')
    const handleAddGenre = async () => {
        if ( genreName === '') {
            toast.error('Vui lòng nhập đầy đủ thông tin')
        } else {
            const data = {
                genre_name: genreName
            }
            const response = await createGenre(data)
            if (response.status === 200) {
                setShowModal(false)
                toast.success('Thêm thể loại thành công')
            }
        }
    }
    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-12'>
                <h1 className='font-semibold text-[30px]'>Thêm thể loại</h1>
                <div className='w-[300px]'>
                    <label className='font-semibold'>Tên thể loại</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md'
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)}
                    />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                    <button className='p-4 bg-blue-500 text-white rounded-md' onClick={() => handleAddGenre()}>Thêm</button>
                    <button className='p-4 bg-red-500 text-white rounded-md' onClick={() => setShowModal(false)}>Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default GenreModal