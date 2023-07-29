import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    bookActive: null
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {}
});

export const { } = bookSlice.actions