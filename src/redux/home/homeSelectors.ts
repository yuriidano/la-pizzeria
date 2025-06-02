import type { RootState } from "../store";



export const selectActiveCategory = (state: RootState) => {
    return state.homeReducer.filter.activeCategory
};


export const selectActiveSort = (state: RootState) => {
    return state.homeReducer.filter.activeSort
};


export const selectSearch = (state: RootState) => {
    return state.homeReducer.filter.search
};


export const selectHome = (state: RootState) => {
    return state.homeReducer
};
