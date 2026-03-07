import { StyleSheet } from "react-native";
import { styles } from "../../../shared";

export const s = StyleSheet.create({
    newNoteButton: {
        position: "absolute",
        right: styles.spacing.md,
        bottom: styles.spacing.xl,
        backgroundColor: styles.colors.button,
        width: 64,
        height: 64,
        borderRadius: styles.radius.lg,
        elevation: 6,
        justifyContent: "center",
        alignItems: "center",
    },
});
