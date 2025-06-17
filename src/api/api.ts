import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { OrderType, PizzaType } from "../@types";

const BASE_URL = 'https://67e4282e2ae442db76d34bc3.mockapi.io/';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['cartPizzas'],
    endpoints: (builder) => ({
        // getPizzas: builder.query<PizzaType[], {activeCategory: number, sortQuery: string, order: string, search: string, limit: number, currentPage: number}>({
        //     query: ({activeCategory, sortQuery, order, search, limit, currentPage}) => {
        //         if(search !== '') {
        //             return (
        //             `items?sortBy=${sortQuery}&order=${order}&search=${search}&limit=${limit}&page=${currentPage}`
        //         ) 
        //         } else {
        //             const catecoryQuery = activeCategory !== 0 ? activeCategory : '';
        //             return (
        //             `items?category=${catecoryQuery}&sortBy=${sortQuery}&order=${order}&limit=${limit}&page=${currentPage}`
        //         )
        //         }
        //     }
        // }),
        addOrder: builder.mutation<OrderType, OrderType>({
            query: (order) => ({
                url: 'order',
                method: 'POST',
                body: order
            })
        }),
        getPizza: builder.query<PizzaType, string>({
            query: (id) => `/items/${id}`
        })
    })
});

export const {  useAddOrderMutation, useGetPizzaQuery} = pizzaApi;

