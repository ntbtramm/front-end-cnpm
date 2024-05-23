import Axios from '../axios'

export const createBook = async (data) => Axios({
    url: '/api/book/create',
    method: 'POST',
    data
})

export const createBookTitle = async (data) => Axios({
    url: '/api/book_title/create',
    method: 'POST',
    data
})
export const allBook_titles = async () => Axios({
    method: 'GET',
    url: '/api/book_title/get_all'
})

export const oneBook_title = async (book_id) => Axios({
    method: 'GET',
    url: `/api/book_title/get_one?id=${book_id}`
})


export const oneBook_title_details = async (book_title_id) => Axios({
    method: 'GET',
    url: `/api/book_title/get_detail?id=${book_title_id}`
})

export const search_Book_titles = async (query) => Axios({
    method: 'GET',
    url: `/api/book_title/search?query=${query}`
})


export const Book_by_title_id = async (book_title_id) => Axios({
    method: 'GET',
    url: `/api/book_title/get_by_title_id?id=${book_title_id}`
})

export const allBooks = async () => Axios({
    method: 'GET',
    url: '/api/book/get_all'
})
export const oneBook = async (book_id) => Axios({
    method: 'GET',
    url: `/api/book/get_one?id=${book_id}`
})
export const getImage = async (book_id) => Axios({
    method: 'GET',
    url: `/api/image/get?image=${book_id}`
})
export const getTitle = async (book_id) => Axios({
    method: 'GET',
    url: `/api/book_title/get_one?id=${book_id}`
})

export const get_image_url = (image_id) => {
    if (image_id) {
        return `http://localhost:5000/api/image/get?id=${image_id}`
    }
    return "http://localhost:5000/api/image/get"
}

export const get_n_newest_book = async (n = 4) => Axios({
    method: 'GET',
    url: `/api/book_title/get_new_books?n=${n}`
})

export const upload_book_image = async (book_title_id, image) => {
    let formData = new FormData();
    formData.append("file", image);

    return Axios.post(
        `/api/image/add_to_book_title?id=${book_title_id}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        }
    )
}
