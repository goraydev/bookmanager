import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    status: "not-authenticated",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        checking: (state, { payload }) => {
            state.status = 'checking';
        },

        login: (state, { payload }) => {

            state.status = "authenticated";
        },

        logout: (state, { payload }) => {
            state.status = "not-authenticated";
        },

    }
});

export const { login, logout, checking, clearErrorMessage } = authSlice.actions