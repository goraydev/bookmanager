import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    status: "not-authenticated",
    user: {}
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        checking: (state, { payload }) => {
            state.status = 'checking';
            state.user = {};
        },

        login: (state, { payload }) => {

            state.status = "authenticated";
            state.user = payload;
        },

        logout: (state, { payload }) => {
            state.status = "not-authenticated";
            state.user = {}
        },

    }
});

export const { login, logout, checking, clearErrorMessage } = authSlice.actions