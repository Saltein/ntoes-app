import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotesPage } from "../../../pages";
import { NoteRedactorPage } from "../../../pages/NoteRedactorPage/NoteRedactorPage";
import { AppStackParamList } from "./types";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notes" component={NotesPage} />
            <Stack.Screen name="NoteRedactor" component={NoteRedactorPage} />
        </Stack.Navigator>
    );
}
