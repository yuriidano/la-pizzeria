import type { RootState } from "../store";

export const selectCartPizza = (state: RootState) => {
    return state.cartReducer.cartPizzas
};