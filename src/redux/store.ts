import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import homeReducer from './home/homeSlice'
import { pizzaApi } from '../api/api'



export const store = configureStore({
  reducer: {
    homeReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware)
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()