import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    colorPeekCon: {
        position: "absolute",
        top: 48,
        marginHorizontal: styles.spacing.sm,
        backgroundColor: styles.colors.backgroundItems,
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
