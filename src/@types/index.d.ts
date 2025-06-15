
export type PizzaType = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes:number[],
    price: number,
    category: number,
    rating: number,
    description: string,
    ingredients: string[]
}

export type CartPizzaType = {
    id: number,
    imageUrl: string,
    title: string,
    type?: string | null,
    size?: number | null,
    price: number,
    count: number
}


export type OrderType = {
    firstName?: string,
    lastName?: string,
    phone?: string,
    address?: string,
    email?: string,
    items?: CartPizzaType[],
}

export type ActiveSortType = {name: string, sortProperty: string};