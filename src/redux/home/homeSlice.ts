import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActiveSortType } from "../../@types";

export type FilterType = {
        activeCategory: number,
        activeSort: ActiveSortType | null,
        search: string,
        currentPage: number,
    }

interface HomeState {
    filter: FilterType,
    limit: number,
    pageCount: number,
    isError: boolean
};

const initialState: HomeState = {
    filter: {
        activeCategory: 0,
        activeSort: { name: 'rating (asc)', sortProperty: 'rating' },
        search: '',
        currentPage: 1,
    },
    limit: 4,
    pageCount: 3,
    isError: false
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setActiveCategory(state, action: PayloadAction<number>) {
            state.filter.activeCategory = action.payload
        },
        setActiveSort(state, action: PayloadAction<ActiveSortType>) {
            state.filter.activeSort = action.payload
        },
        setSearch(state, action:PayloadAction<string>) {
            state.filter.search = action.payload
        },
        setCurrentPage(state, action:PayloadAction<number>) {
            state.filter.currentPage = action.payload
        },
        setFilter(state, action:PayloadAction<FilterType>) {
            state.filter = action.payload
        },
        toggleIsError(state, action:PayloadAction<boolean>) {
            state.isError = action.payload
        }
    }
});


export const { setActiveCategory, setActiveSort, setSearch, setCurrentPage, setFilter, toggleIsError } = homeSlice.actions;

export default homeSlice.reducer;