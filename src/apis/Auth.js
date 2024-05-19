
import Axios from '../axios'

export const login = async (data) => Axios({
    method: 'POST',
    url: '/api/user/get_auth_token',
    data
})
export const getUserInfo = async () => Axios({
    method: 'GET',
    url: '/api/user/get_by_token'
})

export const delete_cookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
