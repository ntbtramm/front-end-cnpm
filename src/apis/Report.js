import Axios from '../axios'

export const getGenreReport = async (data) => Axios({
    url: '/api/report/get_per_genre_report',
    method: 'GET',
    data,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

export const getOverdueReport = async (data) => Axios({
    url: '/api/report/get_overdue_lending',
    method: 'GET',
    data,
    
})