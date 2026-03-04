import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "../features/search/model/slice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        // [weatherApi.reducerPath]: weatherApi.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
