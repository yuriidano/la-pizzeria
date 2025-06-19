import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { OrderType, PizzaType } from "../@types";

const BASE_URL = 'https://67e4282e2ae442db76d34bc3.mockapi.io/';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['cartPizzas'],
    endpoints: (builder) => ({
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

