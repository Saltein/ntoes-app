import { Pressable } from "react-native";
import React, { ReactNode } from "react";
import { Portal } from "react-native-paper";

interface DefaultMenuProps {
    setMenuIsOpen: (isOpen: boolean) => void;
    children: ReactNode;
}

export function DefaultMenu({
    setMenuIsOpen,
    children,
}: DefaultMenuProps) {
    return (
        <Portal>
            <Pressable
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
                onPress={() => setMenuIsOpen(false)}
            />
            {children}
        </Portal>
    );
}
