import { Pressable, View } from "react-native";
import { DefaultText, styles } from "../../../../shared";
import { s } from "./RedactorMenuStyles";
import { useDeleteNoteMutation } from "../../../../features/notes/model/notesApiSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../../app/providers/navigation/types";
import TrashIcon from "../../../../shared/assets/icons/trash.svg";

interface RedactorMenuProps {
    noteId: number;
    navigation: NativeStackNavigationProp<AppStackParamList>;
}

export function RedactorMenu({ noteId, navigation }: RedactorMenuProps) {
    const [deleteNote, { data, isLoading, isError, error }] =
        useDeleteNoteMutation();

    async function handleDeleteNote() {
        await deleteNote(noteId);
        if (data) {
            navigation.goBack();
        }
    }

    return (
        <View style={s.container}>
            <Pressable
                onPress={handleDeleteNote}
                style={s.pressableCon}
            >
                <TrashIcon
                    height={24}
                    width={24}
                    color={styles.colors.textMain}
                />
                <DefaultText style={s.deleteText}>Удалить</DefaultText>
            </Pressable>
        </View>
    );
}
