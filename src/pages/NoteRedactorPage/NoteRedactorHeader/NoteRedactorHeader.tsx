import { FlatList, Pressable, View } from "react-native";
import { s } from "./NoteRedactorHeaderStyles";
import BackIcon from "../../../shared/assets/icons/back.svg";
import PaletteIcon from "../../../shared/assets/icons/palette.svg";
import OptionsIcon from "../../../shared/assets/icons/options.svg";
import { Note } from "../../../entities/note/model/types";
import { invertColorWithBrightness } from "../../../entities/note/utils/invertColorWithBrigtness";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../app/providers/navigation/types";
import { useState } from "react";
import { DefaultMenu, DefaultText, styles } from "../../../shared";
import { RedactorMenu } from "./RedactorMenu/RedactorMenu";
import { pastelColors } from "../../../shared/consts";

interface NoteRedactorHeaderProps {
    noteData: Note | undefined;
    onColorChange: (newColor: string) => void;
}

export default function NoteRedactorHeader({
    noteData,
    onColorChange,
}: NoteRedactorHeaderProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isColorPeekOpen, setColorPeekOpen] = useState(false);

    const noteColors = pastelColors;

    const color = invertColorWithBrightness(
        noteData ? noteData.color : "#ffffff",
        0.3,
    );

    const navigation =
        useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    function handleBack() {
        navigation.goBack();
    }

    return (
        <View style={s.container}>
            <Pressable style={s.button} onPress={handleBack}>
                <BackIcon height={32} width={32} color={color} />
            </Pressable>

            <View style={s.rightContainer}>
                <Pressable
                    style={s.button}
                    onPress={() => setColorPeekOpen(true)}
                >
                    <PaletteIcon height={26} width={26} color={color} />
                </Pressable>

                <Pressable style={s.button} onPress={() => setMenuOpen(true)}>
                    <OptionsIcon height={20} width={20} color={color} />
                </Pressable>
            </View>

            {isColorPeekOpen && noteData && (
                <DefaultMenu setMenuIsOpen={setColorPeekOpen}>
                    <View
                        style={[
                            s.colorPeekCon,
                            {
                                borderColor: invertColorWithBrightness(
                                    noteData.color,
                                    0.3,
                                ),
                            },
                        ]}
                    >
                        <FlatList
                            data={noteColors}
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
                </DefaultMenu>
            )}

            {isMenuOpen && noteData && (
                <DefaultMenu setMenuIsOpen={setMenuOpen}>
                    <RedactorMenu
                        navigation={navigation}
                        noteId={noteData.id}
                        noteColor={noteData.color}
                    />
                </DefaultMenu>
            )}
        </View>
    );
}
