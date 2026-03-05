import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "../features/search/model/slice";
import { authApi } from "../features/auth/model/authApiSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
