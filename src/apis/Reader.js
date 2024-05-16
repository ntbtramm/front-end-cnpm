import Axios from '../axios'

export const getAllReaders = async()=>Axios({
    url:'/api/user/get_all',
    method:'GET'
})

export const createReader = async(data)=>Axios({
    url:'/api/user/create',
    method:'POST',
    data
})