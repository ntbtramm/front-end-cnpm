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

export const change_name = async (author_id, new_author_name) => {
    return Axios({
        method: 'POST',
        url: '/api/author/change_name',
        data: {
            author_id: author_id,
            new_author_name: new_author_name
        }
    });
};