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
import NoteRedactorHeader from "./NoteRedactorHeader/NoteRedactorHeader";

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
            delay: 1000, // Сохраняем через 1 секунду после остановки печати
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
        // Проблема на сервере при редактировании, ждем патча
        if (!noteData) {
            return null;
        }
        const updatedNote = {
            ...noteData,
            title: newTitle,
        } as Note;
        dispatch(setCurrentNote(updatedNote));
        debouncedSave(updatedNote);
    }

    function handleContentChange(newContent: string) {
        // Проблема на сервере при редактировании, ждем патча
        if (!noteData) {
            return null;
        }
        const updatedNote = {
            ...noteData,
            content: newContent,
        } as Note;
        dispatch(setCurrentNote(updatedNote));
        debouncedSave(updatedNote);
    }

    return (
        <View style={[s.container, { backgroundColor: color }]}>
            <NoteRedactorHeader noteData={noteData} />
            <DefaultTextInput
                placeholder="Название"
                value={title}
                onChangeText={handleTitleChange}
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
                style={{
                    color: invertColorWithBrightness(color, 0.3),
                }}
                placeholderTextColor={
                    invertColorWithBrightness(color, 0.3) + "99"
                }
            />
            {isSaving && <DefaultText>Saving...</DefaultText>}
            {lastSaved && <DefaultText>Last saved</DefaultText>}
        </View>
    );
    // При нажатии на кнопу новой заметки сразу создавалась новая заметка,
    // ее id должен как то попадать в currentNote в редукс (а, ну в ответе сервера будет id), потом открывался редактор этой заметки
    // Нужно чтобы запрос на редактирование заметки прилетал по дебаунсу
    // Сделать индикатор сохранения данных
}
