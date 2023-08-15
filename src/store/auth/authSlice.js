import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    status: "not-authenticated",
    message: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        checking: (state, { payload }) => {
            state.status = 'checking';
            state.message = null;
        },

        login: (state, { payload }) => {

            state.status = "authenticated";
        },

        logout: (state, { payload }) => {
            state.status = "not-authenticated";
        },

        errorMessage: (state, { payload }) => {
            state.message = payload;
        }

    }
});

export const { login, logout, checking, errorMessage } = authSlice.actions