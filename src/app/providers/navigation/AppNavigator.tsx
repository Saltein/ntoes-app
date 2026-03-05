import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotesPage } from "../../../pages";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notes" component={NotesPage} />
            {/* <Stack.Screen name="EditNote" component={EditNotePage} /> */}
        </Stack.Navigator>
    );
}
