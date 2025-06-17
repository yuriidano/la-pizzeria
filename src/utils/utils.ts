import type { CartPizzaType } from "../@types";

export const calcTotalPrice = (cartPizzas: CartPizzaType[]) => {
    return  cartPizzas.reduce((sum, item) => item.price * item.count + sum, 0);
}

export const findPizzaById = (cartPizzas: CartPizzaType[], id: number, size?: number | null, type?: number | null | undefined | string) => {
    return  cartPizzas.find(pizza => pizza.id === id && pizza.size === size && pizza.type === type);
}

export const calcTotalCount = (cartPizzas: CartPizzaType[]) => {
    return cartPizzas.reduce((sum, item) => item.count + sum, 0)
}