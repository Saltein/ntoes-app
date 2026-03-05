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
        baseUrl: "http://localhost:3001/api/",
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
                url: "login",
                method: "POST",
                body: body,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;
