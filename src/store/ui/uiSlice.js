import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modalBook: false
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {

        openOrCloseModalBook: (state, { payload }) => {
            state.modalBook = state.modalBook ? false : true;
        }
    }
});

export const { openOrCloseModalBook } = uiSlice.actions

