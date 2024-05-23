import Axios from '../axios'


export const getAllBorrow = async()=> Axios({
    method: 'GET',
    url: '/api/lending/get_all'
})

export const getAllBorrowByUser = async(id)=> Axios({
    method: 'GET',
    url: `/api/lending/get_by_user?id=${id}`
})

export const getOneBorrow = async(id) =>Axios({
    url:'/api/lending/get_one?id='+id,
    method:'GET'
})

export const addBorrow = async(data) => Axios({
    url:'/api/lending/create',
    method:'POST',
    data
})

export const createBorrow = async(data) => Axios({
    url:'/api/lending/create',
    method:'POST',
    data
})