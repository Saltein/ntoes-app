import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: styles.radius.md,
        paddingHorizontal: styles.spacing.sm,
        paddingVertical: styles.spacing.xs,
        marginBottom: styles.spacing.xs,
        borderWidth: 1,
    },

    title: {
        fontWeight: 600,
        fontSize: 16,
    },

    content: {
        flexWrap: "wrap",
    },
});
