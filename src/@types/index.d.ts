
export type PizzaType = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes:number[],
    price: number,
    category: number,
    rating: number
}


export type ActiveSortType = {name: string, sortProperty: string};