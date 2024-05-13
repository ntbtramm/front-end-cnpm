import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        user: null,
        isLogin: false,
        borrow: []
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
            state.isLogin = true
        },
        logoutSuccess(state) {
            state.user = null
            state.isLogin = false
            state.borrow = []
        },
        borrowBook: (state, action) => {
            if(state.borrow.filter(item=>item.book_id === action.payload.book_id).length > 0) {
                state.borrow = state.borrow.map(item => item.book_id === action.payload.book_id ? {...item, borrowedBook_quantity: item.borrowedBook_quantity + 1} : item)
                return
            }else{
                state.borrow?.push(action.payload)
            }     
        },
        deleteBook : (state, action) => {
            state.borrow = state.borrow.filter(item=>item.book_id !== action.payload)
        }
    }
})

export default appSlice.reducer
export const { loginSuccess, logoutSuccess, borrowBook, deleteBook } = appSlice.actions