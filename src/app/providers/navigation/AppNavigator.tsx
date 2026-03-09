import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TopTabNavigator } from "./TopTabNavigator";
import { NoteRedactorPage } from "../../../pages/NoteRedactorPage/NoteRedactorPage";
import { AppStackParamList } from "./types";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TopTabNavigator} />
            <Stack.Screen
                name="NoteRedactor"
                component={NoteRedactorPage}
                initialParams={{ isPublic: false }}
            />
            <Stack.Screen
                name="NoteRedactorPublic"
                component={NoteRedactorPage}
                initialParams={{ isPublic: true }}
            />
        </Stack.Navigator>
    );
}
