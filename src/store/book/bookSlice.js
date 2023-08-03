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
            state.activeBook = null;
        },

        updateBook: (state, { payload }) => {
            state.books = state.books.map(book => {
                if (book._id === payload._id) {
                    return payload;
                }
                return book;
            })
            state.activeBook = null;
        },

        deleteBook: (state, { payload }) => {
            state.books = state.books.filter(book => book._id !== payload._id)
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
    updateBook,
    deleteBook,
    clearAllBook,
} = bookSlice.actions