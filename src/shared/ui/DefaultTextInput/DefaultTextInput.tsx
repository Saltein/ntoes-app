import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { styles } from "../../styles/styles";
import React, { forwardRef } from "react";

export const DefaultTextInput = forwardRef<TextInput, TextInputProps>(
    ({ style, ...props }, ref) => {
        return (
            <TextInput
                ref={ref}
                style={[s.input, style]}
                {...props}
                placeholderTextColor={
                    props.placeholderTextColor || styles.colors.textMuted
                }
            />
        );
    },
);

const s = StyleSheet.create({
    input: {
        width: "100%",
        fontSize: 18,
        includeFontPadding: false, // Android фикс
        color: styles.colors.textMain,
        paddingHorizontal: styles.spacing.md,
    },
});
