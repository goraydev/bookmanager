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

        onSetActiveBook: (state, { payload }) => {
            state.activeBook = payload;
        },
        createNewBook: (state, { payload }) => {
            state.books.push(payload);
            state.bookActive = null;
        }
    }
});

export const {
    onSetActiveBook,
    createNewBook
} = bookSlice.actions