import React, { useEffect, useState } from 'react'
import { Button, InputField } from '../../components/public'
import { icons } from '../../ultils/icons'
import { allBooks, allBook_titles , get_image_url} from '../../apis/Books'
import noImage from '../../assets/images/image.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Books = () => {
    const { IoIosSearch } = icons
    const user = useSelector(state => state.app?.user)
    const [book_title, setBook_title] = useState([])
    const getAllBook_titles = async () => {
        const response = await allBook_titles()
        setBook_title(response.data)
    }
    
    const get_authors = (author_list) => {
        let authors = []
        for (let i = 0; i < author_list.length; i++){
            authors.push(
                author_list[i]["author_name"]
            )
        }

        return authors.join(', ')
    }

    useEffect(() => {
        getAllBook_titles()
    }, [])
    return (
        <div>
            <div className='flex justify-between items-center'>
                {user?.is_admin === true ? <Button
                    name='Thêm sách'
                    style='bg-black w-[180px] text-white rounded-2xl p-2 hover:text-gray-300'
                /> : <div className='w-[180px]'></div>}
                <div className='flex items-center border bg-white border-gray-300 p-2 rounded-2xl mt-2'>
                    <IoIosSearch size={30} />
                    <InputField
                        placeholder='Tìm kiếm sách...'
                        style='border-none px-2 py-1'
                    />
                </div>
            </div>
            <div className='grid grid-cols-4 mt-8'>
                {book_title.length > 0 && book_title.map((item) => {
                    return (
                        <Link to={`/books/${item.book_title_id}`}>
                        <div key={item.book_title_id} className='flex flex-col items-center gap-2 p-4 bg-white m-4 hover:shadow-xl'>
                            <img src={get_image_url(item.image_id)} alt={item.book_name} className='w-[150px] h-[200px]' />
                            <span>Mã sách: {item.book_title_id}</span>
                            <span>Tên sách: {item.book_name}</span>
                            <span>Thể loại: {item.genre_name}</span>
                            <span>Tác giả: {get_authors(item.authors)}</span>
                        </div>
                        </Link>
                    )
                })}
            </div>
        </div >
    )
}

export default Books