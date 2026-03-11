import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Note } from "./types";

interface NoteState {
    currentNote: Note | null;
    currentNoteNickname: string;
}

const initialState: NoteState = {
    currentNote: null,
    currentNoteNickname: "",
};

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        setCurrentNote: (state, action: PayloadAction<Note | null>) => {
            state.currentNote = action.payload;
        },
        setCurrentNoteNickname: (state, action) => {
            state.currentNoteNickname = action.payload;
        },
    },
});

export const { setCurrentNote, setCurrentNoteNickname } = noteSlice.actions;
export const noteReducer = noteSlice.reducer;

export const selectCurrentNote = (state: RootState) => state.note.currentNote;
export const selectCurrentNoteNickname = (state: RootState) =>
    state.note.currentNoteNickname;
