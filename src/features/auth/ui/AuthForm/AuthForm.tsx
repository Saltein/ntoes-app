import { View } from "react-native";
import { DefaultText, DefaultTextInput } from "../../../../shared";
import { s } from "./AuthFormStyles";

export function AuthForm() {
    return (
        <View style={s.container}>
            <DefaultText style={s.title}>Вход</DefaultText>
            <DefaultTextInput style={s.input} placeholder="Почта или никнейм" />
            <DefaultTextInput style={s.input} placeholder="Пароль" />
        </View>
    );
}
