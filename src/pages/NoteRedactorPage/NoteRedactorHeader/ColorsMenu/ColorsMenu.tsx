import { FlatList, Pressable, View } from "react-native";
import { s } from "./ColorsMenuStyles";
import { invertColorWithBrightness } from "../../../../entities/note/utils/invertColorWithBrigtness";
import { pastelColors } from "../../../../shared/consts";
import { styles } from "../../../../shared";

interface ColorsMenuProps {
    noteColor: string;
    onColorChange: (color: string) => void;
}

export function ColorsMenu({ noteColor, onColorChange }: ColorsMenuProps) {
    return (
        <View
            style={[
                s.colorPeekCon,
                {
                    borderColor: invertColorWithBrightness(noteColor, 0.3),
                },
            ]}
        >
            <FlatList
                data={pastelColors}
                horizontal={true}
                contentContainerStyle={{
                    gap: styles.spacing.xs,
                    marginHorizontal: styles.spacing.sm,
                }}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() => onColorChange(item)}
                            style={[
                                s.colorBox,
                                {
                                    backgroundColor: item,
                                },
                            ]}
                        />
                    );
                }}
                keyExtractor={(item) => item}
            />
        </View>
    );
}
