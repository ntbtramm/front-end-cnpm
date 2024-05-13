import Axios from '../axios'

export const getAllAuthors = async () => Axios({
    method: 'GET',
    url: '/api/author/get_all',
})