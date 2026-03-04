import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    searchWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: styles.colors.border,
        borderRadius: styles.radius.xxl,
        paddingLeft: styles.spacing.sm,
        height: 48,
    },

    textInput: {
        flex: 1,
        fontSize: 18,
        includeFontPadding: false,
        color: styles.colors.textMain,
        paddingHorizontal: styles.spacing.sm,
    },

    clearButton: {
        height: "100%",
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
});
