import { View } from "react-native";
import { DefaultText } from "../../shared";
import { s } from "./HeaderStyles";
import SearchBar from "../../features/search/ui/SearchBar/SearchBar";

interface HeaderProps {
    nickname?: string;
}

export function Header({ nickname }: HeaderProps) {
    return (
        <View style={s.container}>
            <SearchBar />

            <DefaultText style={s.profile}>{nickname ?? "Профиль"}</DefaultText>
        </View>
    );
}
