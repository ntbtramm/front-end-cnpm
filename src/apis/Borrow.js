import Axios from '../axios'


export const getAllBorrow = async()=> Axios({
    method: 'GET',
    url: '/api/lending/get_all'
})