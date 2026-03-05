import { useWindowDimensions, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AuthLoadingScreen } from "../features/auth/ui/AuthLoadingScreen/AuthLoadingScreen";
import { useGetMeQuery } from "../features/auth/model/authApiSlice";
import { styles } from "../shared";
import { RootNavigator } from "./providers/navigation/RootNavigator";

export function Root() {
    const { height } = useWindowDimensions();
    const { data, isLoading } = useGetMeQuery();

    if (isLoading) {
        return <AuthLoadingScreen />;
    }

    const isAuth = !!data;

    return (
        <>
            <StatusBar style="auto" />
            <SafeAreaView style={[s.container, { height }]}>
                <PaperProvider>
                    <NavigationContainer>
                        <RootNavigator isAuth={isAuth} />
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaView>
        </>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: styles.colors.backgroundMain,
    },
    innerContainer: {
        flex: 1,
    },
});
