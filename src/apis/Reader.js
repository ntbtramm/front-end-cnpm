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

export const getAllReaderType = async()=>Axios({
    url:'/api/reader_type/get_all',
    method:'GET'
})

export const createReaderType = async(data)=>Axios({
    url:'/api/reader_type/create',
    method:'POST',
    data
})