import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        // city: cityReducer,
        // [weatherApi.reducerPath]: weatherApi.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
