import { StyleSheet } from "react-native";
import { styles } from "../../styles/styles";

export const s = StyleSheet.create({
    container: {
        alignSelf: "center",
        position: "absolute",
        paddingHorizontal: styles.spacing.sm,
        paddingVertical: styles.spacing.xs,
        borderRadius: styles.radius.xxl,
        top: styles.spacing.sm,
        maxWidth: "90%",
        elevation: 4,
        zIndex: 1000,
    },

    text: {
        fontWeight: 600,
        fontSize: 18,
    },

    error: {
        borderColor: styles.colors.error,
        backgroundColor: styles.colors.errorBack,
    },

    warning: {
        borderColor: styles.colors.warning,
        backgroundColor: styles.colors.warningBack,
    },

    info: {
        borderColor: styles.colors.info,
        backgroundColor: styles.colors.infoBack,
    },

    errorText: {
        color: styles.colors.error,
    },

    warningText: {
        color: styles.colors.warning,
    },

    infoText: {
        color: styles.colors.info,
    },
});
