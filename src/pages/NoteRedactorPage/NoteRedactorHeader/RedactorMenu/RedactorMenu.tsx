import { Pressable, View } from "react-native";
import { DefaultText, styles, useDebouncedSave } from "../../../../shared";
import { s } from "./RedactorMenuStyles";
import { useDeleteNoteMutation } from "../../../../features/notes/model/notesApiSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../../app/providers/navigation/types";
import { invertColorWithBrightness } from "../../../../entities/note/utils/invertColorWithBrightness";
import TrashIcon from "../../../../shared/assets/icons/trash.svg";
import EyeOpen from "../../../../shared/assets/icons/eye.svg";
import EyeSlashed from "../../../../shared/assets/icons/eye-slash.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    selectCurrentNote,
    setCurrentNote,
} from "../../../../entities/note/model/slice";
import { Note } from "../../../../entities/note/model/types";

interface RedactorMenuProps {
    noteData: Note | undefined;
    navigation: NativeStackNavigationProp<AppStackParamList>;
    debouncedSave: (data: Note) => void;
    setMenuOpen: (value: boolean) => void;
}

export function RedactorMenu({
    noteData,
    navigation,
    debouncedSave,
    setMenuOpen,
}: RedactorMenuProps) {
    if (!noteData) return <DefaultText>No data</DefaultText>;

    const [deleteNote] = useDeleteNoteMutation();
    const { id, color, is_public } = noteData;

    const dispatch = useDispatch();

    async function handleDeleteNote() {
        try {
            const deletedNote = await deleteNote(id);
            navigation.goBack();
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    }

    async function handleChangePrivacy() {
        if (!noteData) {
            return null;
        }
        if (is_public) {
            const updatedNote = {
                ...noteData,
                is_public: false,
            } as Note;
            dispatch(setCurrentNote(updatedNote));
            setMenuOpen(false);
            debouncedSave(updatedNote);
        } else {
            const updatedNote = {
                ...noteData,
                is_public: true,
            } as Note;
            dispatch(setCurrentNote(updatedNote));
            setMenuOpen(false);
            debouncedSave(updatedNote);
        }
    }

    const textColor = invertColorWithBrightness(color, 0.3);

    return (
        <View style={[s.container, { borderColor: textColor }]}>
            <Pressable onPress={handleDeleteNote} style={s.pressableCon}>
                <TrashIcon height={24} width={24} color={textColor} />
                <DefaultText style={[s.deleteText, { color: textColor }]}>
                    Удалить
                </DefaultText>
            </Pressable>
            <Pressable onPress={handleChangePrivacy} style={s.pressableCon}>
                {is_public ? (
                    <EyeSlashed height={24} width={24} color={textColor} />
                ) : (
                    <EyeOpen height={24} width={24} color={textColor} />
                )}
                <DefaultText style={[s.deleteText, { color: textColor }]}>
                    {is_public ? "Сделать приватной" : "Сделать публичной"}
                </DefaultText>
            </Pressable>
        </View>
    );
}
