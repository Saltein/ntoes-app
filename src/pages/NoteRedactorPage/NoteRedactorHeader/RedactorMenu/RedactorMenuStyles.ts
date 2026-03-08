import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        top: 48,
        paddingHorizontal: styles.spacing.sm,
        paddingVertical: styles.spacing.xs,
        margin: styles.spacing.xs,
        backgroundColor: styles.colors.backgroundMain,
        borderWidth: 2,
        borderRadius: styles.radius.md,
        elevation: 6,
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
