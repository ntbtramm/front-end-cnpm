import Axios from '../axios'

export const returnBook = async (id)=>Axios({
    url: `/api/lending/return?id=${id}`,
    method: 'POST',
})

export const getAllReturn = async()=>Axios({
    url: '/api/book_receipt/get_all',
    method: 'GET',
})