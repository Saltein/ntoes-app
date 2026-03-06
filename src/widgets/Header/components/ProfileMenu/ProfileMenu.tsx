import { View, Pressable } from "react-native";
import { s } from "./ProfileMenuStyles";
import { DefaultText, styles } from "../../../../shared";
import LogoutIcon from "../../../../shared/assets/icons/logout.svg";
import { useLogoutMutation } from "../../../../features/auth/model/authApiSlice";
import { tokenStorage } from "../../../../shared/lib/storage/tokenStorage";

export function ProfileMenu() {
    const [logout] = useLogoutMutation();

    async function handleLogout() {
        logout();
        await tokenStorage.removeToken();
    }

    return (
        <View style={s.container}>
            <Pressable style={s.logoutButton} onPress={handleLogout}>
                <LogoutIcon
                    height={32}
                    width={32}
                    color={styles.colors.error}
                />
                <DefaultText style={s.logoutText}>
                    Выйти из аккаунта
                </DefaultText>
            </Pressable>
        </View>
    );
}
