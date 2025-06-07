import type { CartPizzaType } from "../@types";

export const calcTotalPrice = (cartPizzas: CartPizzaType[]) => {
    return  cartPizzas.reduce((sum, item) => item.price * item.count + sum, 0);
}

export const findPizzaById = (cartPizzas: CartPizzaType[], id: number) => {
    return  cartPizzas.find(pizza => pizza.id === id);
}