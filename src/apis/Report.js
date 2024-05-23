import Axios from '../axios'

export const getGenreReport = async (data) => Axios({
    url: `/api/report/get_per_genre_report?month=${data.month}&year=${data.year}`,
    method: 'GET',
})

export const getOverdueReport = async (data) => Axios({
    url: `/api/report/get_overdue_lending?day=${data.day}&month=${data.month}&year=${data.year}`,
    method: 'GET',
})