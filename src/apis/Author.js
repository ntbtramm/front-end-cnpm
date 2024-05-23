import Axios from '../axios'

export const getAllAuthors = async () => Axios({
    method: 'GET',
    url: '/api/author/get_all',
})

export const createAuthor = async (data) =>Axios({
    method: 'POST',
    url: '/api/author/create',
    data
})