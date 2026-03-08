import { StyleSheet } from "react-native";
import { styles } from "../../../shared";

export const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    button: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
    },

    colorPeekCon: {
        position: "absolute",
        top: 48,
        marginHorizontal: styles.spacing.sm,
        backgroundColor: styles.colors.backgroundMain,
        paddingVertical: styles.spacing.sm,
        borderWidth: 2,
        borderRadius: styles.radius.xl,
        elevation: 6,
    },

    colorBox: {
        height: 48,
        width: 48,
        borderRadius: styles.radius.sm,
    },
});
