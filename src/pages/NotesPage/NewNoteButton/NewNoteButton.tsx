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
    const [createNote, { data, isLoading, isError }] = useCreateNoteMutation();

    const newNoteTamplate = {
        title: "",
        content: "",
        color: "#ffffff",
        is_public: false,
    } as Note;

    async function handleNewNote() {
        await createNote(newNoteTamplate);

        if (data) {
            dispatch(setCurrentNote(newNoteTamplate));
            navigation.navigate("NoteRedactor");
            console.log(data);
        }
    }

    return (
        <Pressable style={s.newNoteButton} onPress={handleNewNote}>
            <AddIcon
                width={48}
                height={48}
                color={styles.colors.textBrightMain}
            />
        </Pressable>
    );
}
