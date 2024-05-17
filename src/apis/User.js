import Axios from '../axios'

export const getAllUser = async()=> Axios({
    url:'/api/user/get_all',
    method:'GET'
})

export const getOneUser = async(id)=> Axios({
    url:`/api/user/get_one?id=${id}`,
    method:'GET'    
})