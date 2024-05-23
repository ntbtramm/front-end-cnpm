import Axios from '../axios'

export const getAllUser = async()=> Axios({
    url:'/api/user/get_all',
    method:'GET'
})

export const getOneUser = async(id)=> Axios({
    url:`/api/user/get_one?id=${id}`,
    method:'GET'    
})

export const payPenalty = async(data)=> Axios({
    url:`/api/user/pay_penalty`,
    method:'POST',
    data
})

export const Delete_user = async(user_id)=> Axios({
    url:`/api/user/delete_user?id=${user_id}`,
    method:'DELETE'
})