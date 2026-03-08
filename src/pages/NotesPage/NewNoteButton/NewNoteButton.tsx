import { Pressable } from "react-native";
import AddIcon from "../../../shared/assets/icons/add.svg";
import { styles } from "../../../shared";
import { s } from "./NewNoteButtonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../app/providers/navigation/types";
import { useDispatch } from "react-redux";
import { setCurrentNote } from "../../../entities/note/model/slice";
import { useCreateNoteMutation } from "../../../features/notes/model/notesApiSlice";
import { useEffect } from "react";
import { Note } from "../../../entities/note/model/types";

export function NewNoteButton() {
    const navigation =
        useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const dispatch = useDispatch();
    const [createNote, { isLoading }] = useCreateNoteMutation();

    const newNoteTamplate = {
        title: "",
        content: "",
        color: "#ffffff",
        is_public: false,
    } as Note;

    async function handleNewNote() {
        try {
            const createdNote = await createNote(newNoteTamplate).unwrap();
            console.log("createdNote", JSON.stringify(createdNote));

            dispatch(setCurrentNote(createdNote)); // Используем созданную заметку
            navigation.navigate("NoteRedactor");
        } catch (error) {
            console.error("Failed to create note:", error);
        }
    }

    return (
        <Pressable style={s.newNoteButton} onPress={handleNewNote}>
            {isLoading && (
                <AddIcon
                    width={48}
                    height={48}
                    color={styles.colors.textBrightMain}
                />
            )}
            <AddIcon
                width={48}
                height={48}
                color={styles.colors.textBrightMain}
            />
        </Pressable>
    );
}
