import { StatusBar } from "expo-status-bar";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../shared";
import { AuthPage, NotesPage } from "../pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
    const { height } = useWindowDimensions();

    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <SafeAreaView style={[s.container, { height: height }]}>
                <View style={s.innerContainer}>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen name="Auth" component={AuthPage} />
                            <Stack.Screen name="Notes" component={NotesPage} />
                        </Stack.Navigator>
                    </NavigationContainer>
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
