import { data } from 'autoprefixer'
import Axios from '../axios'

export const login = async(data)=>Axios({
    method:'POST',
    url:'/login',
    data
})