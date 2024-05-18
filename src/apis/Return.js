import Axios from '../axios'

export const returnBook = async (id)=>Axios({
    url: `/api/lending/return?id=${id}`,
    method: 'POST',
})