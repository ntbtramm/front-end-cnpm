import Axios from '../axios'


export const getallBook_Receipt = async () => Axios({
    method: 'GET',
    url: '/api/book_receipt/get_all'
})

export const createBookReceipt = async (data) => Axios({
    url: '/api/book_receipt/create',
    method: 'POST',
    data
})