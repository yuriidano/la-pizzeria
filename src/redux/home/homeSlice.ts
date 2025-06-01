import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActiveSortType } from "../../@types";



interface HomeState {
    activeCategory: number,
    activeSort: ActiveSortType | null,
    search: string
};

const initialState:HomeState = {
    activeCategory: 0,
    activeSort: { name: 'rating (asc)', sortProperty: 'rating' },
    search: ''
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setActiveCategory(state, action: PayloadAction<number>) {
            state.activeCategory = action.payload
        },
        setActiveSort(state, action: PayloadAction<ActiveSortType>) {
            state.activeSort = action.payload
        },
        setSearch(state, action:PayloadAction<string>) {
            state.search = action.payload
        }
    }
});


export const { setActiveCategory, setActiveSort, setSearch } = homeSlice.actions;

export default homeSlice.reducer;