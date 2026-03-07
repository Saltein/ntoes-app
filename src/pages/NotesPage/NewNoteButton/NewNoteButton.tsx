import { Pressable } from "react-native";
import AddIcon from "../../../shared/assets/icons/add.svg";
import { styles } from "../../../shared";
import { s } from "./NewNoteButtonStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../app/providers/navigation/types";
import { useDispatch } from "react-redux";
import { setCurrentNote } from "../../../entities/note/model/slice";

export function NewNoteButton() {
    const navigation =
        useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const dispatch = useDispatch();

    function handleNewNote() {
        dispatch(setCurrentNote(null));
        navigation.navigate("NoteRedactor");
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
