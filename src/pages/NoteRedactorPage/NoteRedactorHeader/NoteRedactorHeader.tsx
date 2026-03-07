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

interface NoteRedactorHeaderProps {
    noteData: Note | undefined;
}

export default function NoteRedactorHeader({
    noteData,
}: NoteRedactorHeaderProps) {
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
                <Pressable style={s.button}>
                    <PaletteIcon height={26} width={26} color={color} />
                </Pressable>
                <Pressable style={s.button}>
                    <OptionsIcon height={20} width={20} color={color} />
                </Pressable>
            </View>
        </View>
    );
}
