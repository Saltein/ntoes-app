import { StyleSheet } from "react-native";
import { styles } from "../../shared";

export const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: styles.spacing.sm,
        width: "100%",
        marginBottom: styles.spacing.sm,
    },

    profile: {
        backgroundColor: styles.colors.button,
        color: styles.colors.textBrightMain,
        borderRadius: styles.radius.lg,
        paddingHorizontal: styles.spacing.md,
        height: 48,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        alignSelf: "center",
    },
});
