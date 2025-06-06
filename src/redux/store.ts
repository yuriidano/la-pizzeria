import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { pizzaApi } from '../api/api'
import homeReducer from './home/homeSlice'
import cartReducer from './cart//cartSlice'




export const store = configureStore({
  reducer: {
    homeReducer,
    cartReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware)
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()