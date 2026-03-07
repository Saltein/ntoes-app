import { View } from "react-native";
import { DefaultText, styles } from "../../../../shared";
import { useEffect, useState } from "react";

export function AuthLoadingScreen() {
    const [loadingDots, setLoadingDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingDots((prev) => prev + ".");
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (loadingDots.length > 3) setLoadingDots(".");
    }, [loadingDots]);

    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
            }}
        >
            <View
                style={{
                    borderLeftColor: styles.colors.border,
                    borderLeftWidth: 3,
                    paddingLeft: styles.spacing.sm,
                }}
            >
                <DefaultText style={{ fontSize: 24, lineHeight: 24 }}>
                    NotesApp
                </DefaultText>
                <DefaultText
                    style={{ fontSize: 16, lineHeight: 16, marginBottom: 2 }}
                >
                    Загрузка{loadingDots}
                </DefaultText>
            </View>
        </View>
    );
}
