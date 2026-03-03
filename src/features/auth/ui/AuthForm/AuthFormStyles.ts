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
});
