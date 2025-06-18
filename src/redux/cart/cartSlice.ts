import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartPizzaType } from "../../@types"
import { calcTotalPrice,  findPizzaByIdSizePype } from "../../utils/utils";


interface CartState {
    cartPizzas: CartPizzaType[],
    totalPrice: number
}

const initialState:CartState = {
    cartPizzas: [],
    totalPrice: 0
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaCart(state, action:PayloadAction<CartPizzaType>) {
            const searchPizza = findPizzaByIdSizePype(state.cartPizzas, action.payload.id, action.payload.size, action.payload.type);

            if(searchPizza) {
                searchPizza.count++
            } else {
                state.cartPizzas.push(action.payload)
            }

            state.totalPrice = calcTotalPrice(state.cartPizzas);
        },
        removePizza(state, action:PayloadAction<{id: number, size: number, type: string}>) {
            state.cartPizzas = state.cartPizzas.filter(pizza => !(pizza.id === action.payload.id && pizza.size === action.payload.size && pizza.type === action.payload.type))
            state.totalPrice = calcTotalPrice(state.cartPizzas);
        },
        clearCart(state) {
            state.cartPizzas = [];
            state.totalPrice = calcTotalPrice(state.cartPizzas);
        },
        addCountPizza(state, action:PayloadAction<{id: number, size: number, type: string}>) {
             const searchPizza = findPizzaByIdSizePype(state.cartPizzas, action.payload.id, action.payload.size, action.payload.type);
            if (searchPizza) {
                searchPizza.count++;
                state.totalPrice = calcTotalPrice(state.cartPizzas);
            }
        },
        removeCountPizza(state, action: PayloadAction<{id: number, size: number, type: string}>) {
             const searchPizza = findPizzaByIdSizePype(state.cartPizzas, action.payload.id, action.payload.size, action.payload.type);
            if (searchPizza) {
                searchPizza.count--;
                state.totalPrice = calcTotalPrice(state.cartPizzas);
            }
        },

        setPizzasCart(state, action: PayloadAction<CartPizzaType[]>) {
            state.cartPizzas = action.payload;
            state.totalPrice = calcTotalPrice(state.cartPizzas);
        }
    }
});


export const {addPizzaCart, removePizza, clearCart, addCountPizza, removeCountPizza, setPizzasCart} = cartSlice.actions;

export default cartSlice.reducer;