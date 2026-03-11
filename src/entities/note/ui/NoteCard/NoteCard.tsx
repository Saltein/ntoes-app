import { Pressable, View } from "react-native";
import { DefaultText, styles } from "../../../../shared";
import { s } from "./NoteCardStyles";
import { invertColorWithBrightness } from "../../utils/invertColorWithBrightness";
import { Note } from "../../model/types";
import { useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../../../app/providers/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { setCurrentNote } from "../../model/slice";
import EyeIcon from "../../../../shared/assets/icons/eye.svg";

interface NoteCardProps {
    data: Note;
    isPublic: boolean;
}

export function NoteCard({ data, isPublic }: NoteCardProps) {
    const { color, content, title, updated_at, is_public } = data;

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
            {!isPublic && is_public && (
                <View
                    style={{
                        position: "absolute",
                        right: styles.spacing.xs,
                        top: styles.spacing.xxs,
                        backgroundColor: color,
                        borderRadius: styles.radius.sm,
                    }}
                >
                    <EyeIcon
                        height={16}
                        width={16}
                        color={invertColorWithBrightness(color, 0.3)}
                    />
                </View>
            )}

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
