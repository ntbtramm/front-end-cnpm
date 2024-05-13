import Axios from '../axios'
export const allBooks = async()=>Axios({
    method:'GET',
    url:'/api/book/get_all'
})
export const oneBook = async(book_id)=>Axios({
    method:'GET',
    url:`/api/book/get_one?id=${book_id}`
})
export const getImage = async(book_id)=>Axios({
    method:'GET',
    url:`/api/image/get?image=${book_id}`
})
export const getTitle =async(book_id)=>Axios({
    method:'GET',
    url:`/api/book_title/get_one?id=${book_id}`
})