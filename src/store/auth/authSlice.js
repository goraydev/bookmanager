import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    status: "authenticated",
    message: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

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

export const { login, logout, errorMessage } = authSlice.actions