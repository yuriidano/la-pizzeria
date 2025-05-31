import type { RootState } from "../store";



export const selectActiveCategory = (state: RootState) => {
    return state.homeReducer.activeCategory
};
