import type { RootState } from "../store";



export const selectActiveCategory = (state: RootState) => {
    return state.homeReducer.activeCategory
};


export const selectActiveSort = (state: RootState) => {
    return state.homeReducer.activeSort
};


export const selectSearch = (state: RootState) => {
    return state.homeReducer.search
};


export const selectHome = (state: RootState) => {
    return state.homeReducer
};
