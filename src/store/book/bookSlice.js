import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoadingBooks: true,
    activeBook: null,
    books: [],
    listTypeBook: [],
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {

        getBooks: (state, { payload }) => {
            state.isLoadingBooks = false;
            state.books = payload;
        },
        setActiveBook: (state, { payload }) => {
            state.activeBook = payload;
        },
        createNewBook: (state, { payload }) => {
            state.books.push(payload);
            state.activeBook = null;
        },

        updateBook: (state, { payload }) => {
            state.books = state.books.map(book => {
                if (book.id === payload.id) {
                    return payload;
                }
                return book;
            })
            state.activeBook = null;
        },

        deleteBook: (state, { payload }) => {
            state.books = state.books.filter(book => book.id !== payload);
        },
        clearAllBook: (state) => {
            //state.books = [];
            state.activeBook = null;
            state.isLoadingBooks = true;
        }
    }
});

export const {
    getBooks,
    setActiveBook,
    createNewBook,
    updateBook,
    deleteBook,
    clearAllBook,
} = bookSlice.actions