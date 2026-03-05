import { View } from "react-native";
import { useState } from "react";
import { s } from "../FormStyles";
import { DefaultTextInput, MainButton, Warning } from "../../../../shared";
import { comparePasswords } from "../../utils/comparePasswords";
import { Portal } from "react-native-paper";
import { useRegisterMutation } from "../../model/authApiSlice";
import { validateEmail } from "../../utils/validateEmail";
import { AuthMode } from "../AuthModeSwitcher/AuthModeSwitcher";

interface RegisterFormProps {
    setMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    setNotice: React.Dispatch<React.SetStateAction<string>>;
}

export function RegisterForm({ setMode, setNotice }: RegisterFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [textError, setTextError] = useState("");

    const [register, { isLoading }] = useRegisterMutation();

    async function handleRegister() {
        if (!name || !email || !password || !passwordCheck) {
            setTextError("Заполните все поля");
        } else if (!validateEmail(email)) {
            setTextError("Некорректный формат почты");
        } else if (password.length < 8) {
            setTextError("Пароль должен содержать как минимум 8 символов");
        } else if (!comparePasswords(password, passwordCheck)) {
            setTextError("Пароли не совпадают");
        } else {
            try {
                const result = await register({
                    email: email,
                    nickname: name,
                    password: password,
                }).unwrap();
                if (result) {
                    setNotice("Регистрация успешна");
                    setMode("login");
                } else setTextError("Неизвестная ошибка");
            } catch (err) {
                const error = JSON.stringify(err);
                if (error.includes("uni_users_email")) {
                    setTextError("Пользователь с таким email уже существует");
                } else if (error.includes("uni_users_nickname")) {
                    setTextError("Пользователь с таким именем уже существует");
                } else {
                    setTextError(`Ошибка: ${error}`);
                }
            }
        }
    }

    function handleChange(
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
    ) {
        setTextError("");
        setValue(value);
    }

    return (
        <View style={s.container}>
            <DefaultTextInput
                textContentType="nickname"
                maxLength={16}
                style={s.input}
                placeholder="Имя"
                value={name}
                onChangeText={(text: string) => handleChange(text, setName)}
            />
            <DefaultTextInput
                textContentType="emailAddress"
                maxLength={32}
                style={s.input}
                placeholder="Почта"
                value={email}
                onChangeText={(text: string) => handleChange(text, setEmail)}
            />
            <DefaultTextInput
                textContentType="password"
                secureTextEntry={true}
                maxLength={32}
                style={s.input}
                placeholder="Пароль"
                value={password}
                onChangeText={(text: string) => handleChange(text, setPassword)}
            />
            <DefaultTextInput
                textContentType="password"
                secureTextEntry={true}
                maxLength={32}
                style={s.input}
                placeholder="Повторите пароль"
                value={passwordCheck}
                onChangeText={(text: string) =>
                    handleChange(text, setPasswordCheck)
                }
            />

            <MainButton onPress={handleRegister} title="Зарегистрироваться" />

            {textError && (
                <Portal>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        {isLoading && (
                            <Warning
                                type="info"
                                content="Ждем ответ сервера..."
                            />
                        )}
                        <Warning type="error" content={textError} />
                    </View>
                </Portal>
            )}
        </View>
    );
}
