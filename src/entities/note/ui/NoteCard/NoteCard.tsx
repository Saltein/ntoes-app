import { Pressable, View } from "react-native";
import { DefaultText } from "../../../../shared";
import { s } from "./NoteCardStyles";
import { invertColorWithBrightness } from "../../utils/invertColorWithBrigtness";
import { Note } from "../../model/types";
import { useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../../../app/providers/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { setCurrentNote } from "../../model/slice";

interface NoteCardProps {
    data: Note;
    isPublic: boolean;
}

export function NoteCard({ data, isPublic }: NoteCardProps) {
    const { color, content, title, updated_at, user_id } = data;

    const dispatch = useDispatch();

    const navigation =
        useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    function handleOpenNote() {
        dispatch(setCurrentNote(data));
        navigation.navigate("NoteRedactor", { isPublic: isPublic });
    }

    return (
        <Pressable
            style={[
                s.container,
                {
                    backgroundColor: color,
                    borderColor: invertColorWithBrightness(color, 0.3),
                },
            ]}
            onPress={handleOpenNote}
        >
            {title && (
                <DefaultText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                        s.title,
                        { color: invertColorWithBrightness(color, 0.3) },
                    ]}
                >
                    {title}
                </DefaultText>
            )}
            <DefaultText
                numberOfLines={16}
                ellipsizeMode="tail"
                style={[
                    s.content,
                    { color: invertColorWithBrightness(color, 0.3) },
                ]}
            >
                {content}
            </DefaultText>
        </Pressable>
    );
}
