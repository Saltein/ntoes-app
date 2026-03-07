import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "../features/search/model/slice";
import {
    authApi,
    tokenTriggerReducer,
} from "../features/auth/model/authApiSlice";
import { notesApi } from "../features/notes/model/notesApiSlice";
import { noteReducer } from "../entities/note/model/slice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        tokenTrigger: tokenTriggerReducer,
        note: noteReducer,
        [authApi.reducerPath]: authApi.reducer,
        [notesApi.reducerPath]: notesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, notesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
