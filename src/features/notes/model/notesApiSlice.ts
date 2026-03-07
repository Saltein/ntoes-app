import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    CreateNoteParams,
    CreateNoteResponse,
    DeleteNoteResponse,
    GetMyNotesResponse,
    GetOneNoteResponse,
    UpdateNoteParams,
    UpdateNoteResponse,
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

export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery,
    endpoints: (builder) => ({
        createNote: builder.mutation<CreateNoteResponse, CreateNoteParams>({
            query: (body) => ({
                url: "notes",
                method: "POST",
                body,
            }),
        }),
        getOneNote: builder.query<GetOneNoteResponse, void>({
            query: (id) => ({
                url: `notes/${id}`,
            }),
        }),
        getMyNotes: builder.query<GetMyNotesResponse, void>({
            query: () => ({
                url: "notes",
            }),
        }),
        deleteNote: builder.mutation<DeleteNoteResponse, void>({
            query: (id) => ({
                url: `notes/${id}`,
                method: "DELETE",
            }),
        }),
        updateNote: builder.mutation<UpdateNoteResponse, UpdateNoteParams>({
            query: (body) => ({
                url: `notes/${body.id}`,
                method: "PATCH",
                body,
            }),
        }),
    }),
});

export const {
    useCreateNoteMutation,
    useGetOneNoteQuery,
    useGetMyNotesQuery,
    useDeleteNoteMutation,
    useUpdateNoteMutation,
} = notesApi;

export const notesReducer = notesApi.reducer;
export const notesMiddleware = notesApi.middleware;
