import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authors: [],
    typeAuthors: []
}

export const authorSlice = createSlice({
    name: "authorbook",
    initialState,
    reducers: {

        getAuthors: (state, { payload }) => {
            state.authors = payload;
        },

        getTypeAuthors: (state, { payload }) => {
            state.typeAuthors = payload;
        }
    }
});

export const { getAuthors, getTypeAuthors } = authorSlice.actions