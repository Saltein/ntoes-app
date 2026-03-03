import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { styles } from "../../styles/styles";

export const DefaultTextInput = ({ style, ...props }: TextInputProps) => {
    return (
        <TextInput
            style={[s.input, style]}
            {...props}
            multiline={false}
            placeholderTextColor={styles.colors.textMuted}
        />
    );
};

const s = StyleSheet.create({
    input: {
        width: "100%",
        fontSize: 18,
        includeFontPadding: false, // Android фикс
        color: styles.colors.textMain,
        paddingHorizontal: styles.spacing.md,
    },
});
