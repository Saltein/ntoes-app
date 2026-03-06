import { Pressable, View } from "react-native";
import { DefaultText, styles } from "../../shared";
import { s } from "./HeaderStyles";
import SearchBar from "../../features/search/ui/SearchBar/SearchBar";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "../../features/auth/model/types";
import { ProfileMenu } from "./components/ProfileMenu/ProfileMenu";

interface HeaderProps {
    data?: User;
}

export function Header({ data }: HeaderProps) {
    return (
        <View style={s.container}>
            <LinearGradient
                colors={[styles.colors.backgroundMain, "transparent"]}
                style={{
                    height: "150%",
                    width: "200%",
                    position: "absolute",
                    top: 0,
                }}
            />
            <SearchBar />
            <Pressable>
                <DefaultText style={s.profile}>
                    {data?.nickname ?? "Профиль"}
                </DefaultText>
            </Pressable>

            <ProfileMenu />
        </View>
    );
}
