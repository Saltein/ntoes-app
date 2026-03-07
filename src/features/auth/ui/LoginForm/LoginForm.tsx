import { View } from "react-native";
import { DefaultTextInput, MainButton, Warning } from "../../../../shared";
import { useState } from "react";
import { s } from "../FormStyles";
import { Portal } from "react-native-paper";
import {
    setTokenTrigger,
    useLoginMutation,
} from "../../model/authApiSlice";
import { validateEmail } from "../../utils/validateEmail";
import { useNoticeVisibility } from "../../../../shared/hooks/useNoticeVisibility";
import { tokenStorage } from "../../../../shared/lib/storage/tokenStorage";
import { useDispatch } from "react-redux";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [textError, setTextError] = useState("");
    const [trigger, setTrigger] = useState(0);
    const isVisible = useNoticeVisibility(textError, trigger);
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    async function handleLogin() {
        setTrigger((prev) => prev + 1);
        if (!email || !password) {
            setTextError("Заполните все поля");
        } else if (!validateEmail(email)) {
            setTextError("Некорректный формат почты");
        } else if (password.length < 8) {
            setTextError("Пароль должен содержать как минимум 8 символов");
        } else {
            try {
                const result = await login({
                    email: email,
                    password: password,
                }).unwrap();
                if (result) {
                    console.log("Response: ", JSON.stringify(result));
                    tokenStorage.setToken(result.token);
                    dispatch(setTokenTrigger());
                    setTextError("");
                }
            } catch (err) {
                const error = JSON.stringify(err);
                if (error.includes("record not found")) {
                    setTextError("Такого пользователя не существует");
                } else if (error.includes("Wrong password")) {
                    setTextError("Неправильная почта или пароль");
                } else setTextError(`Ошибка: ${error}`);
            }
        }
    }

    return (
        <View style={s.container}>
            <DefaultTextInput
                textContentType="emailAddress"
                maxLength={32}
                style={s.input}
                placeholder="Почта"
                value={email}
                onChangeText={setEmail}
            />
            <DefaultTextInput
                textContentType="password"
                secureTextEntry={true}
                maxLength={32}
                style={s.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
            />

            <MainButton onPress={handleLogin} title="Войти" />

            {isVisible && textError && (
                <Portal>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        {isLoading ? (
                            <Warning
                                type="info"
                                content="Ждем ответ сервера..."
                            />
                        ) : (
                            <Warning type="error" content={textError} />
                        )}
                    </View>
                </Portal>
            )}
        </View>
    );
}
