import Axios from '../axios'

export const getAllGenre = async()=>Axios({
    url:`/api/genre/get_all`,
    method:'GET'
})
export const createGenre = async(data)=>Axios({
    url:`/api/genre/create`,
    method:'POST',
    data
})

export const updateGenre = async(data)=>Axios({
    url:`/api/genre/change_name`,
    method:'POST',
    data    
})