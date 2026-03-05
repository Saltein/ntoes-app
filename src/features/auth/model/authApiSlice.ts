import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    LoginParams,
    LoginResponse,
    RegisterParams,
    RegisterResponse,
} from "./types";

const baseUrl = "http://192.168.3.120:3001/api/";

const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
});

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery,
    tagTypes: ["Auth"],
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
                body,
            }),
            invalidatesTags: ["Auth"],
        }),
        getMe: builder.query<LoginResponse, void>({
            query: () => "users/auth-check",
            providesTags: ["Auth"],
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery } = authApi;

export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;
