import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartPizzaType } from "../../@types"


interface CartState {
    cartPizzas: CartPizzaType[],
}

const initialState:CartState = {
    cartPizzas: [],
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaCart(state, action:PayloadAction<CartPizzaType>) {
            const searchPizza = state.cartPizzas.find(pizza => pizza.id === action.payload.id);

            if(searchPizza) {
                searchPizza.count++
            } else {
                state.cartPizzas.push(action.payload)
            }
        },
        removePizza(state, action:PayloadAction<number>) {
            state.cartPizzas = state.cartPizzas.filter(pizza => pizza.id !== action.payload)
        },
        clearCart(state) {
            state.cartPizzas = []
        },
        addCountPizza(state, action:PayloadAction<number>) {
            const searchPizza = state.cartPizzas.find(pizza => pizza.id === action.payload);
            if (searchPizza) {
                searchPizza.count++
            }
        },
        removeCountPizza(state, action: PayloadAction<number>) {
            const searchPizza = state.cartPizzas.find(pizza => pizza.id === action.payload);
            if (searchPizza) {
                searchPizza.count--
            }
        }
    }
});


export const {addPizzaCart, removePizza, clearCart, addCountPizza, removeCountPizza} = cartSlice.actions;

export default cartSlice.reducer;