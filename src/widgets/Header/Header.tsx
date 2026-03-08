import { Pressable, View } from "react-native";
import { DefaultMenu, DefaultText, styles } from "../../shared";
import { s } from "./HeaderStyles";
import SearchBar from "../../features/search/ui/SearchBar/SearchBar";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "../../features/auth/model/types";
import { ProfileMenu } from "./components/ProfileMenu/ProfileMenu";
import { useState } from "react";
import { Portal } from "react-native-paper";

interface HeaderProps {
    data?: User;
}

export function Header({ data }: HeaderProps) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    function toggleMenuOpen() {
        setMenuIsOpen((prev) => !prev);
    }

    return (
        <View style={s.container}>
            <LinearGradient
                colors={[styles.colors.backgroundMain, "transparent"]}
                style={{
                    height: "150%",
                    width: "200%",
                    position: "absolute",
                    top: styles.spacing.xs,
                }}
            />
            <SearchBar />
            <Pressable onPress={toggleMenuOpen}>
                <DefaultText style={s.profile}>
                    {data?.nickname ?? "Профиль"}
                </DefaultText>
            </Pressable>

            {menuIsOpen && (
                <DefaultMenu setMenuIsOpen={setMenuIsOpen}>
                    <ProfileMenu />
                </DefaultMenu>
                // <>
                //     <Portal>
                //         <Pressable
                //             style={{
                //                 position: "absolute",
                //                 top: 0,
                //                 left: 0,
                //                 right: 0,
                //                 bottom: 0,
                //             }}
                //             onPress={() => setMenuIsOpen(false)}
                //         />
                //         <ProfileMenu />
                //     </Portal>
                // </>
            )}
        </View>
    );
}
