import type { CartPizzaType, PizzaType } from "../@types";

// home slice

export const calcPizzaPriceSize = (pizzas: PizzaType[], id: number, size: number) => {
    const pizzasResult = pizzas.map(pizza => {
        if (pizza.id === id && pizza.currentSize === 26 && size === 30) {
            return { ...pizza, price: pizza.price += 9 }
        } else if (pizza.id === id && pizza.currentSize === 30 && size === 40) {
            return { ...pizza, price: pizza.price += 7 }
        } else if (pizza.id === id && pizza.currentSize === 26 && size === 40) {
            return { ...pizza, price: pizza.price += 14 }
        }

        if (pizza.id === id && pizza.currentSize === 40 && size === 30) {
            return { ...pizza, price: pizza.price -= 7 }
        } else if (pizza.id === id && pizza.currentSize === 30 && size === 26) {
            return { ...pizza, price: pizza.price -= 9 }

        } else if (pizza.id === id && pizza.currentSize === 40 && size === 26) {
            return { ...pizza, price: pizza.price -= 14 }
        }
        return pizza;
    });
    return pizzasResult;
};

export const calcPizzaPriceType = (pizzas: PizzaType[], id: number, type: number) => {
    const pizzasResult = pizzas.map(pizza => {
        if (pizza.id === id && type === 1 && pizza.types.length > 1) {
            return { ...pizza, price: pizza.price += 7 }
        }
        if (pizza.id === id && type === 0 && pizza.types.length > 1) {
            return { ...pizza, price: pizza.price -= 7 }
        }
        return pizza;
    });
    return pizzasResult;
};



// cart slice

export const calcTotalPrice = (cartPizzas: CartPizzaType[]) => {
    return  cartPizzas.reduce((sum, item) => item.price * item.count + sum, 0);
}

export const calcTotalCount = (cartPizzas: CartPizzaType[]) => {
    return cartPizzas.reduce((sum, item) => item.count + sum, 0)
}

export const findPizzaByIdSizePype = (cartPizzas: CartPizzaType[], id: number, size?: number | null, type?: string | null) => {
    return cartPizzas.find(pizza => pizza.id === id && pizza.size === size && pizza.type === type);
}

export const calcAllPizzaIdCount = (cartPizzas: CartPizzaType[], id: number) => {
    const pizzas = cartPizzas.filter(pizza => pizza.id === id);
    return pizzas.reduce((acc, pizza) => {
        return acc + pizza.count;
    }, 0)
};




