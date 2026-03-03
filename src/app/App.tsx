import { StatusBar } from "expo-status-bar";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../shared";
import { AuthPage } from "../pages";

export default function App() {
    const { height } = useWindowDimensions();

    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <SafeAreaView style={[s.container, { height: height }]}>
                <View style={s.innerContainer}>
                    <AuthPage />
                </View>
            </SafeAreaView>
        </Provider>
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
