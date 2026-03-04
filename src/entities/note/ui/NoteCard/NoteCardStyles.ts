import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: styles.radius.md,
        padding: styles.spacing.sm,
        marginBottom: styles.spacing.sm,
    },

    text: {
        flexWrap: "wrap",
    },
});
