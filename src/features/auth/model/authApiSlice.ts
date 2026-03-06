import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    LoginParams,
    LoginResponse,
    RegisterParams,
    RegisterResponse,
} from "./types";
import { tokenStorage } from "../../../shared/lib/storage/tokenStorage";

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
    tagTypes: ["Auth"],
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
            invalidatesTags: ["Auth"],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "users/logout",
                method: "GET",
            }),
        }),
        getMe: builder.query<LoginResponse, void>({
            query: () => "users/auth-check",
            providesTags: ["Auth"],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApi;

export const authReducer = authApi.reducer;
export const authMiddleware = authApi.middleware;
