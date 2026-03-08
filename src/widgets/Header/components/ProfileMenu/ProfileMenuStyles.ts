import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    container: {
        position: "absolute",
        top: 64,
        right: styles.spacing.xs,
        backgroundColor: styles.colors.backgroundItems,
        borderWidth: 2,
        borderColor: styles.colors.error,
        borderRadius: styles.radius.md,
        elevation: 6,

        zIndex: 100,
    },

    logoutButton: {
        paddingHorizontal: styles.spacing.md,
        height: 48,
        alignItems: "center",
        flexDirection: "row",
    },

    logoutText: {
        fontSize: 18,
        fontWeight: 600,
        color: styles.colors.error,
    },
});
