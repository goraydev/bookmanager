import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal: false
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {

        openOrCloseModal: (state, { payload }) => {
            state.modal = state.modal ? false : true;
        }
    }
});

export const { openOrCloseModal } = uiSlice.actions

