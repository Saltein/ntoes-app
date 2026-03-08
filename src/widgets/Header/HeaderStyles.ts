import { StyleSheet } from "react-native";
import { styles } from "../../shared";

export const s = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        paddingHorizontal: styles.spacing.xs,
        paddingVertical: styles.spacing.xs,
        flexDirection: "row",
        alignItems: "center",
        gap: styles.spacing.xs,
        marginBottom: styles.spacing.sm,
    },

    profile: {
        backgroundColor: styles.colors.button,
        color: styles.colors.textBrightMain,
        borderRadius: styles.radius.xxl,
        paddingHorizontal: styles.spacing.md,
        height: 48,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
        alignSelf: "center",
        elevation: 6,
    },
});
