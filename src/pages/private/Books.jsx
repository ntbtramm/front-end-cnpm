import React, { useEffect, useState } from 'react'
import { Button, InputField } from '../../components/public'
import { icons } from '../../ultils/icons'
import { search_Book_titles, allBook_titles, get_image_url } from '../../apis/Books'
import noImage from '../../assets/images/image.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Books = () => {
    const { IoIosSearch } = icons
    const user = useSelector(state => state.app?.user)
    const [book_title, setBook_title] = useState([])
    const [search, setSearch] = useState('')
    const getAllBook_titles = async () => {
        const response = await allBook_titles()
        setBook_title(response.data)
    }

    const get_authors = (author_list) => {
        let authors = []
        for (let i = 0; i < author_list.length; i++) {
            authors.push(
                author_list[i]["author_name"]
            )
        }
        return authors.join(', ')
    }

    const Search_book = async (query) => {
        return search_Book_titles(query).then((response) => {
            setBook_title(response.data)
        }).catch((error) => {
            console.log('oops', error);
        });
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
                    <IoIosSearch size={30} 
                        onClick={()=>{Search_book(search)}}
                    />
                    <InputField
                        placeholder='Tìm kiếm sách...'
                        style='border-none px-2 py-1'
                        setData={setSearch}
                        data={search}
                    />
                </div>
            </div>
            <div className='grid grid-cols-4 mt-8'>
                {book_title.length > 0 ? book_title.map((item) => {
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
                }):"không tìm thấy kết quả"}
            </div>
        </div >
    )
}

export default Books