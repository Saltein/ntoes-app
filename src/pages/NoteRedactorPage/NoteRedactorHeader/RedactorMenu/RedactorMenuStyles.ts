import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        top: 48,
        paddingHorizontal: styles.spacing.md,
        paddingVertical: styles.spacing.xs,
        margin: styles.spacing.xs,
        backgroundColor: styles.colors.backgroundMain,
        borderWidth: 2,
        borderColor: styles.colors.border,
        borderRadius: styles.radius.md,
    },
    pressableCon: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: styles.spacing.xs,
    },
    deleteText: {
        fontSize: 16,
        fontWeight: 600,
    },
});
