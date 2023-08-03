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
        closeModal: (state) => {
            state.modal = false;
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
    closeModal,
    sendMessage,
    clearMessage
} = uiSlice.actions

