import { View } from "react-native";
import { DefaultText } from "../../shared";
import { s } from "./NoteRedactorPageStyles";
import { useSelector } from "react-redux";
import { selectCurrentNote } from "../../entities/note/model/slice";

export function NoteRedactorPage() {
    const noteData = useSelector(selectCurrentNote);

    return (
        <View style={s.container}>
            <DefaultText>{noteData ? noteData.title : ""}</DefaultText>
            <DefaultText>{noteData ? noteData.content : ""}</DefaultText>
        </View>
    );
    // При нажатии на кнопу новой заметки сразу создавалась новая заметка, 
    // ее id должен как то попадать в currentNote в редукс (а, ну в ответе сервера будет id), потом открывался редактор этой заметки
    // Нужно чтобы запрос на редактирование заметки прилетал по дебаунсу
}
