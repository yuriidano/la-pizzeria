import axios from 'axios';
import type { PizzaType } from '../@types';

const instance = axios.create({
    baseURL: 'https://67e4282e2ae442db76d34bc3.mockapi.io/',
      headers: {
        'Content-Type': 'application/json',
    },
});


export const pizzasApi = {
    getPizzas(activeCategory: number, sortQuery: string, order: string, search: string, limit: number, currentPage: number) {
        if (search !== '') {
            return (
                instance.get<PizzaType[]>(`items?sortBy=${sortQuery}&order=${order}&search=${search}&limit=${limit}&page=${currentPage}`)
                    .then(res => res.data)
            )
        } else {
            const catecoryQuery = activeCategory !== 0 ? activeCategory : '';
            return (
                instance.get<PizzaType[]>(`items?category=${catecoryQuery}&sortBy=${sortQuery}&order=${order}&limit=${limit}&page=${currentPage}`)
                .then(res => res.data)
            )
        }
    }
};