import { Pressable, View } from "react-native";
import { DefaultText, DefaultTextInput } from "../../../../shared";
import { s } from "./AuthFormStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../app/proveiders/navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Auth">;

export function AuthForm() {
    const navigation = useNavigation<NavigationProp>();

    function handlePress() {
        navigation.navigate("Notes");
    }

    return (
        <View style={s.container}>
            <DefaultText style={s.title}>Вход</DefaultText>
            <DefaultTextInput style={s.input} placeholder="Почта или никнейм" />
            <DefaultTextInput style={s.input} placeholder="Пароль" />
            <Pressable style={s.authButton}>
                <DefaultText style={s.authButtonText} onPress={handlePress}>
                    Войти
                </DefaultText>
            </Pressable>
        </View>
    );
}
