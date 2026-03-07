import { View, Pressable } from "react-native";
import { s } from "./ProfileMenuStyles";
import { DefaultText, styles } from "../../../../shared";
import LogoutIcon from "../../../../shared/assets/icons/logout.svg";
import {
    setTokenTrigger,
    useLogoutMutation,
} from "../../../../features/auth/model/authApiSlice";
import { tokenStorage } from "../../../../shared/lib/storage/tokenStorage";
import { useDispatch } from "react-redux";

export function ProfileMenu() {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    async function handleLogout() {
        logout();
        dispatch(setTokenTrigger());
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
