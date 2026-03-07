import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    LoginParams,
    LoginResponse,
    RegisterParams,
    RegisterResponse,
} from "./types";
import { tokenStorage } from "../../../shared/lib/storage/tokenStorage";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
        const token = await tokenStorage.getToken();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("X-Client-Type", "mobile");

        return headers;
    },
});

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterParams>({
            query: (body) => ({
                url: "users",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (body) => ({
                url: "users/login",
                method: "POST",
                body,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "users/logout",
                method: "GET",
            }),
        }),
        getMe: builder.mutation<LoginResponse, void>({
            query: () => ({
                url: "users/auth-check",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetMeMutation,
} = authApi;

export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;




const initialState = {
    tokenTrigger: 0,
};

export const tokenTriggerSlice = createSlice({
    name: "tokenTrigger",
    initialState,
    reducers: {
        setTokenTrigger: (state) => {
            state.tokenTrigger += 1;
        },
    },
});

export const { setTokenTrigger } = tokenTriggerSlice.actions;
export const tokenTriggerReducer = tokenTriggerSlice.reducer;

export const selectTokenTrigger = (state: RootState) => state.tokenTrigger.tokenTrigger;
