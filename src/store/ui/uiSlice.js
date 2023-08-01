import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal: false,
    msg: ""
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {

        openOrCloseModal: (state, { payload }) => {
            state.modal = state.modal ? false : true;
        },
        sendMessage: (state, { payload }) => {
            state.msg = payload;
        },

        clearMessage: (state) => {
            state.msg = "";
        }
    }
});

export const {
    openOrCloseModal,
    sendMessage,
    clearMessage
} = uiSlice.actions

