import Axios from '../axios'

export const getAllParams = async () => Axios({
    url: '/api/param/get',
    method:'GET'
})

export const updateOneParams = async (data) => Axios({
    url: '/api/param/set',
    method:'POST',
    data
})