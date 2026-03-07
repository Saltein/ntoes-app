import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Note } from "./types";

interface NoteState {
    currentNote: Note | null;
}

const initialState: NoteState = {
    currentNote: null,
};

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        setCurrentNote: (state, action: PayloadAction<Note | null>) => {
            state.currentNote = action.payload;
        },
    },
});

export const { setCurrentNote } = noteSlice.actions;
export const noteReducer = noteSlice.reducer;

export const selectCurrentNote = (state: RootState) => state.note.currentNote;
