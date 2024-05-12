import { data } from 'autoprefixer'
import Axios from '../axios'

export const login = async(data)=>Axios({
    method:'POST',
    url:'/login',
    data
})
export const getUserInfo = async()=>Axios({
    method:'GET',
    url:'/api/user/get_by_token'
})