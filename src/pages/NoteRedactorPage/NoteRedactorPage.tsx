import { View } from "react-native";
import { DefaultText, DefaultTextInput, useDebouncedSave } from "../../shared";
import { s } from "./NoteRedactorPageStyles";
import { useSelector } from "react-redux";
import {
    selectCurrentNote,
    setCurrentNote,
} from "../../entities/note/model/slice";
import { invertColorWithBrightness } from "../../entities/note/utils/invertColorWithBrigtness";
import { useDispatch } from "react-redux";
import { Note } from "../../entities/note/model/types";
import { useUpdateNoteMutation } from "../../features/notes/model/notesApiSlice";
import { NoteRedactorHeader } from "./NoteRedactorHeader/NoteRedactorHeader";

export function NoteRedactorPage() {
    const noteData = useSelector(selectCurrentNote);
    const dispatch = useDispatch();
    const [updateNote] = useUpdateNoteMutation();

    const { debouncedSave, isSaving, lastSaved } = useDebouncedSave(
        async (data: Note) => {
            try {
                await updateNote({
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    color: data.color,
                    is_public: data.is_public,
                }).unwrap();
            } catch (error) {
                console.error("Failed to save note:", error);
            }
        },
        {
            delay: 500,
            onSave: () => {
                console.log("Note saved successfully");
            },
            onError: (error) => {
                console.error("Error saving note:", error);
            },
        },
    );

    if (!noteData) {
        return null;
    }

    const { id, title, content, color, is_public } = noteData;

    function handleTitleChange(newTitle: string) {
        if (!noteData) {
            return null;
        }
        const updatedNote = {
            ...noteData,
            title: newTitle.trim(),
        } as Note;
        dispatch(setCurrentNote(updatedNote));
        debouncedSave(updatedNote);
    }

    function handleContentChange(newContent: string) {
        if (!noteData) {
            return null;
        }
        const updatedNote = {
            ...noteData,
            content: newContent.trim(),
        } as Note;
        dispatch(setCurrentNote(updatedNote));
        debouncedSave(updatedNote);
    }

    function handleColorChange(newColor: string) {
        if (!noteData) {
            return null;
        }
        const updatedNote = {
            ...noteData,
            color: newColor,
        } as Note;
        dispatch(setCurrentNote(updatedNote));
        debouncedSave(updatedNote);
    }

    return (
        <View style={[s.container, { backgroundColor: color }]}>
            <NoteRedactorHeader
                onColorChange={handleColorChange}
                noteData={noteData}
                debouncedSave={debouncedSave}
            />
            <DefaultTextInput
                placeholder="Название"
                value={title}
                onChangeText={handleTitleChange}
                maxLength={255}
                multiline={true}
                submitBehavior="blurAndSubmit"
                style={{
                    color: invertColorWithBrightness(color, 0.3),
                    fontSize: 22,
                }}
                placeholderTextColor={
                    invertColorWithBrightness(color, 0.3) + "99"
                }
            />
            <DefaultTextInput
                placeholder="Текст"
                value={content}
                onChangeText={handleContentChange}
                maxLength={200000}
                multiline={true}
                style={{
                    color: invertColorWithBrightness(color, 0.3),
                    flex: 1,
                    textAlignVertical: "top",
                }}
                placeholderTextColor={
                    invertColorWithBrightness(color, 0.3) + "99"
                }
            />

            {isSaving && (
                <DefaultText
                    style={{
                        color: invertColorWithBrightness(color, 0.3) + "99",
                    }}
                >
                    Saving...
                </DefaultText>
            )}
        </View>
    );
}
