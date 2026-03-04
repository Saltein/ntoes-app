import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    container: {
        width: "100%",
        padding: styles.spacing.lg,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 24,
    },

    input: {
        borderRadius: styles.radius.xl,
    },

    authButton: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: styles.colors.border,
        borderWidth: 3,
        borderRadius: styles.radius.xl,
        height: 64,
        width: 256,
    },

    authButtonText: {
        fontSize: 20,
        fontWeight: 600,
    },
});
