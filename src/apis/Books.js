import Axios from '../axios'
export const allBooks = async()=>Axios({
    method:'GET',
    url:'/api/book/get_all'
})