import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoadingBooks: true,
    activeBook: null,
    books: []
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {

        setActiveBook: (state, { payload }) => {
            state.activeBook = payload;
        },
        createNewBook: (state, { payload }) => {
            state.books.push(payload);
            state.bookActive = null;
        },
        clearAllBook: (state) => {
            //state.books = [];
            state.activeBook = null;
            state.isLoadingBooks = true;
        }
    }
});

export const {
    setActiveBook,
    createNewBook,
    clearAllBook
} = bookSlice.actions