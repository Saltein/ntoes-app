import { Pressable, View } from "react-native";
import { DefaultText, styles } from "../../../../shared";
import { s } from "./RedactorMenuStyles";
import { useDeleteNoteMutation } from "../../../../features/notes/model/notesApiSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../../app/providers/navigation/types";
import TrashIcon from "../../../../shared/assets/icons/trash.svg";
import { invertColorWithBrightness } from "../../../../entities/note/utils/invertColorWithBrigtness";

interface RedactorMenuProps {
    noteId: number;
    noteColor: string;
    navigation: NativeStackNavigationProp<AppStackParamList>;
}

export function RedactorMenu({
    noteId,
    noteColor,
    navigation,
}: RedactorMenuProps) {
    const [deleteNote] = useDeleteNoteMutation();

    async function handleDeleteNote() {
        try {
            const deletedNote = await deleteNote(noteId);
            navigation.goBack();
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    }

    return (
        <View
            style={[
                s.container,
                { borderColor: invertColorWithBrightness(noteColor, 0.3) },
            ]}
        >
            <Pressable onPress={handleDeleteNote} style={s.pressableCon}>
                <TrashIcon
                    height={24}
                    width={24}
                    color={invertColorWithBrightness(noteColor, 0.3)}
                />
                <DefaultText
                    style={[
                        s.deleteText,
                        { color: invertColorWithBrightness(noteColor, 0.3) },
                    ]}
                >
                    Удалить
                </DefaultText>
            </Pressable>
        </View>
    );
}
