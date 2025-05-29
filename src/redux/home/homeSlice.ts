import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface HomeState {
    activeCategory: number
};

const initialState:HomeState = {
    activeCategory: 0
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setActiveCategory(state, action: PayloadAction<number>) {
            state.activeCategory = action.payload
        }
    }
});


export const { setActiveCategory } = homeSlice.actions;

export default homeSlice.reducer;