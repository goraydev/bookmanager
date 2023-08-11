import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listAuthors: [],
    typeAuthors: [],
    activeAuthorBook: null,
}

export const authorSlice = createSlice({
    name: "authorbook",
    initialState,
    reducers: {

        getAuthors: (state, { payload }) => {
            state.listAuthors = payload;
        },

        getTypeAuthors: (state, { payload }) => {
            state.typeAuthors = payload;
        },
        setActiveAuthorBook: (state, { payload }) => {
            state.activeAuthorBook = payload;
        },

        createNewAuthor: (state, { payload }) => {
            state.listAuthors.push(payload);
        },

        updateAuthor: (state, { payload }) => {
            state.listAuthors = state.listAuthors.map(author => {
                if (author.id === payload.id) {
                    return payload;
                }
                return author;
            });
        },

        deleteAuthor: (state, { payload }) => {
            state.listAuthors = state.listAuthors.filter(author => author.id !== payload);
        },
    }
});

export const {
    getAuthors,
    getTypeAuthors,
    setActiveAuthorBook,
    createNewAuthor,
    updateAuthor,
    deleteAuthor
} = authorSlice.actions