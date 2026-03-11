import { Note, PublicNote } from "../../../entities/note/model/types";

export interface CreateNoteParams {
    title: string;
    content: string;
    color: string;
    is_public: boolean;
}

export interface CreateNoteResponse extends Note {}

export interface GetOneNoteResponse extends Note {}

export interface GetMyNotesResponse {
    data: Note[];
}

export interface GetPublicNotesResponse {
    data: PublicNote[];
}

export interface DeleteNoteResponse {
    id: number;
}

export interface UpdateNoteParams {
    id: number;
    title?: string;
    content?: string;
    color?: string;
    is_public?: boolean;
}

export interface UpdateNoteResponse {
    id: number;
    title?: string;
    content?: string;
    color?: string;
    is_public?: boolean;
}
