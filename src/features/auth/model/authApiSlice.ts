import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    LoginParams,
    LoginResponse,
    RegisterParams,
    RegisterResponse,
} from "./types";

export const authApi = createApi({
    reducerPath: "authApi", // Ключ в store
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.3.120:3001/api/",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterParams>({
            query: (body) => ({
                url: "users",
                method: "POST",
                body: body,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (body) => ({
                url: "users/login",
                method: "POST",
                body: body,
            }),
        }),
        getMe: builder.query<LoginResponse, void>({
            query: () => "users/me",
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;
