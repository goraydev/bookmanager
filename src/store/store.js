import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { bookSlice } from './book/bookSlice'
import { uiSlice } from './ui/uiSlice'
import { authorSlice } from './author/authorSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        book: bookSlice.reducer,
        authors: authorSlice.reducer,
        ui: uiSlice.reducer
    },
})