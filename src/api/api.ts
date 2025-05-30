import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PizzaType } from "../@types";

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://67e4282e2ae442db76d34bc3.mockapi.io/'}),
    endpoints: (builder) => ({
        getPizzas: builder.query<PizzaType[], {activeCategory: number}>({
            query: ({activeCategory}) => {
                const catecoryQuery = activeCategory !== 0 ? activeCategory : '';
                return (
                    `items?category=${catecoryQuery}`
                )
            }
        })
    })
});

export const { useGetPizzasQuery } = pizzaApi;

