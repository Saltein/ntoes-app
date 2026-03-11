import { Pressable, View } from "react-native";
import { DefaultText, styles } from "../../../../shared";
import { s } from "./NoteCardStyles";
import { invertColorWithBrightness } from "../../utils/invertColorWithBrightness";
import { Note } from "../../model/types";
import { useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../../../app/providers/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { setCurrentNote, setCurrentNoteNickname } from "../../model/slice";
import EyeIcon from "../../../../shared/assets/icons/eye.svg";

interface NoteCardProps {
    data: Note;
    isPublic: boolean;
    nickname?: string;
}

export function NoteCard({ data, isPublic, nickname }: NoteCardProps) {
    const { color, content, title, updated_at, is_public } = data;

    const textColor = invertColorWithBrightness(color, 0.3);

    const dispatch = useDispatch();

    const navigation =
        useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    function handleOpenNote() {
        dispatch(setCurrentNote(data));
        if (isPublic) {
            dispatch(setCurrentNoteNickname(nickname));
        }
        navigation.navigate("NoteRedactor", { isPublic: isPublic });
    }

    return (
        <Pressable
            style={[
                s.container,
                {
                    backgroundColor: color,
                    borderColor: textColor,
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
                    <EyeIcon height={16} width={16} color={textColor} />
                </View>
            )}

            {title && (
                <DefaultText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[s.title, { color: textColor }]}
                >
                    {title}
                </DefaultText>
            )}
            <DefaultText
                numberOfLines={16}
                ellipsizeMode="tail"
                style={[s.content, { color: textColor }]}
            >
                {content}
            </DefaultText>

            {isPublic && nickname && (
                <View
                    style={{
                        width: "100%",
                        alignItems: "flex-end",
                    }}
                >
                    <DefaultText style={{ color: textColor + "99" }}>
                        @{nickname}
                    </DefaultText>
                </View>
            )}
        </Pressable>
    );
}
