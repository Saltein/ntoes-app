import { View } from "react-native";
import { DefaultText } from "../../../../shared";
import { s } from "./NoteCardStyles";
import { invertColorWithBrightness } from "../../utils/invertColorWithBrigtness";

interface NoteCardProps {
    content: string;
    color: string;
}

export function NoteCard({ content, color }: NoteCardProps) {
    return (
        <View style={[s.container, { backgroundColor: color }]}>
            <DefaultText
                numberOfLines={16}
                ellipsizeMode="tail"
                style={[
                    s.text,
                    { color: invertColorWithBrightness(color, 0.3) },
                ]}
            >
                {content}
            </DefaultText>
        </View>
    );
}
