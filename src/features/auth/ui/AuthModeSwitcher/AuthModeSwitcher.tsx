import { Pressable, View } from "react-native";
import { LoginForm } from "../LoginForm/LoginForm";
import { s } from "./AuthModeSwitcherStyles";
import { DefaultText, Warning } from "../../../../shared";
import { useEffect, useState } from "react";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { Portal } from "react-native-paper";
import { useNoticeVisibility } from "../../../../shared/hooks/useNoticeVisibility";

export type AuthMode = "login" | "register";

export function AuthModeSwitcher() {
    const [mode, setMode] = useState<AuthMode>("login");
    const [notice, setNotice] = useState("");
    const [trigger, setTrigger] = useState(0);
    const isVisible = useNoticeVisibility(notice, trigger);

    return (
        <View style={s.container}>
            <View style={s.modeSwitcher}>
                <Pressable
                    style={[s.tab, mode === "login" && s.currentTab]}
                    onPress={() => setMode("login")}
                >
                    <DefaultText
                        style={[s.tabTitle, mode === "login" && s.current]}
                    >
                        Вход
                    </DefaultText>
                </Pressable>
                <Pressable
                    style={[s.tab, mode === "register" && s.currentTab]}
                    onPress={() => setMode("register")}
                >
                    <DefaultText
                        style={[s.tabTitle, mode === "register" && s.current]}
                    >
                        Регистрация
                    </DefaultText>
                </Pressable>
            </View>
            {mode === "login" ? (
                <LoginForm />
            ) : (
                <RegisterForm setMode={setMode} setNotice={setNotice} />
            )}

            {isVisible && (
                <Portal>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Warning type="info" content={notice} />
                    </View>
                </Portal>
            )}
        </View>
    );
}
