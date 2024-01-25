import { configureStore } from '@reduxjs/toolkit'
import { bancoSlice } from './bancoSlice/bancoSlice'


export const store = configureStore({
  reducer: {
    banco: bancoSlice.reducer,
  },
})