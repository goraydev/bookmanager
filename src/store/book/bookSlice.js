import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeBook: null,
    books: [],
    listTypeBook: [],
    listInventory: [],

    activeInventory: null
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {

        getBooks: (state, { payload }) => {
            state.books = payload;
            state.listInventory = [];
        },
        getTypeBooks: (state, { payload }) => {
            state.listTypeBook = payload;
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
                if (book.libroid === payload.libroid) {
                    return payload;
                }
                return book;
            })
            state.activeBook = null;
        },

        deleteBook: (state, { payload }) => {
            state.books = state.books.filter(book => book.libroid !== payload);
        },
        clearAllBook: (state) => {
            //state.books = [];
            //state.activeBook = null;
        },

        getInventory: (state, { payload }) => {
            state.listInventory = payload.filter(inv => inv.libroid === state.activeBook.libroid);
        },

        createNewInventory: (state, { payload }) => {
            state.listInventory.push(payload);
            state.activeInventory = null;
        },

        setActiveInventory: (state, { payload }) => {
            state.activeInventory = payload;
        },

        updateInventory: (state, { payload }) => {
            state.listInventory = state.listInventory.map(inv => {
                if (inv.inventarioid === payload.inventarioid) {
                    return payload;
                }
                return inv;
            })
            state.activeInventory = null;
        },

        deleteInventory: (state, { payload }) => {
            state.listInventory = state.listInventory.filter(inv => inv.inventarioid !== payload);
        },
        clearAllInventory: (state) => {
            state.listInventory = [];
            state.activeBook = null;
            state.listInventoryByBook = [];
            state.activeInventory = null;
        },



    }
});

export const {
    getBooks,
    getTypeBooks,
    setActiveBook,
    createNewBook,
    updateBook,
    deleteBook,
    clearAllBook,
    getInventory,
    createNewInventory,
    setActiveInventory,
    updateInventory,
    deleteInventory,
    clearAllInventory
} = bookSlice.actions