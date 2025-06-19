import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActiveSortType, PizzaType } from "../../@types";
import { pizzasApi } from "../../api/home-api";
import { calcPizzaPriceSize, calcPizzaPriceType } from "../../utils/utils";

interface ArgFetchPizzas {
    activeCategory: number, 
    sortQuery: string, 
    order: string, 
    search: string, 
    limit: number, 
    currentPage: number
}

export const fetchPizzas = createAsyncThunk<PizzaType[], ArgFetchPizzas >(
    'home/getPizzas',
    async (arg) => {
            const response = await pizzasApi.getPizzas(arg.activeCategory, arg.sortQuery, arg.order, arg.search, arg.limit, arg.currentPage)
            return response;
    }
);

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
    isError: boolean,
    pizzas: PizzaType[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
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
    isError: false,
    pizzas: [],
    status: "idle",
    error: null
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
        },
        changePizzaPriceType(state, action: PayloadAction<{ id: number, type: number }>) {
            state.pizzas = calcPizzaPriceType(state.pizzas, action.payload.id, action.payload.type);
        },
        setActiveSizePizza(state, action:PayloadAction<{id: number, size: number}>) {
            state.pizzas = state.pizzas.map(pizza => {
                if (pizza.id === action.payload.id) {
                    return { ...pizza, currentSize: action.payload.size }
                }
                return pizza;
            })
        },
        changePizzaPriceSize(state, action: PayloadAction<{ id: number, size: number }>) {
            state.pizzas = calcPizzaPriceSize(state.pizzas, action.payload.id, action.payload.size)
        }
    },

    extraReducers: (builder) => {
        builder.
            addCase(fetchPizzas.pending, (state) => {
                state.status = "loading",
                state.pizzas = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = "succeeded",
                state.pizzas = action.payload
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = "failed",
                state.pizzas = [],
                state.error = action.error.message ?? 'Unknown error'
            })
    }
});

export const { setActiveCategory, setActiveSort, setSearch, setCurrentPage, setFilter, toggleIsError, changePizzaPriceType, changePizzaPriceSize, setActiveSizePizza } 
= homeSlice.actions;

export default homeSlice.reducer;