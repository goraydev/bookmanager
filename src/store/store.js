import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { bookSlice } from './book/bookSlice'
import { uiSlice } from './ui/uiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        book: bookSlice.reducer,
        ui: uiSlice.reducer
    },
})