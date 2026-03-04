import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

const initialState = {
    query: "",
};

export const citySlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
    },
});

export const { setSearchQuery } = citySlice.actions;
export const searchReducer = citySlice.reducer;

export const selectSearchQuery = (state: RootState) => state.search.query;
