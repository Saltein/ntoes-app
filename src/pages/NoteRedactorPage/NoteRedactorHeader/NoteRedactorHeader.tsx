import { Pressable, View } from "react-native";
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
import { DefaultMenu } from "../../../shared";
import { RedactorMenu } from "./RedactorMenu/RedactorMenu";
import { ColorsMenu } from "./ColorsMenu/ColorsMenu";

interface NoteRedactorHeaderProps {
    noteData: Note | undefined;
    onColorChange: (newColor: string) => void;
    debouncedSave: (data: Note) => void;
    isPublic: boolean;
}

export function NoteRedactorHeader({
    noteData,
    onColorChange,
    debouncedSave,
    isPublic,
}: NoteRedactorHeaderProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isColorPeekOpen, setColorPeekOpen] = useState(false);

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

            {!isPublic && (
                <View style={s.rightContainer}>
                    <Pressable
                        style={s.button}
                        onPress={() => setColorPeekOpen(true)}
                    >
                        <PaletteIcon height={26} width={26} color={color} />
                    </Pressable>

                    <Pressable
                        style={s.button}
                        onPress={() => setMenuOpen(true)}
                    >
                        <OptionsIcon height={20} width={20} color={color} />
                    </Pressable>
                </View>
            )}

            {isColorPeekOpen && noteData && (
                <DefaultMenu setMenuIsOpen={setColorPeekOpen}>
                    <ColorsMenu
                        noteColor={noteData.color}
                        onColorChange={onColorChange}
                    />
                </DefaultMenu>
            )}

            {isMenuOpen && noteData && (
                <DefaultMenu setMenuIsOpen={setMenuOpen}>
                    <RedactorMenu
                        setMenuOpen={setMenuOpen}
                        navigation={navigation}
                        noteData={noteData}
                        debouncedSave={debouncedSave}
                    />
                </DefaultMenu>
            )}
        </View>
    );
}
