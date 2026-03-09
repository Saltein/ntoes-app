import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NotesPage } from "../../../pages";
import { styles } from "../../../shared";

const Tab = createMaterialTopTabNavigator();

export function TopTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: styles.colors.textMain,
                    borderRadius: styles.radius.sm,
                    width: "30%",
                    height: 2,
                    marginLeft: "10%",
                },
                tabBarLabelStyle: {
                    margin: 0,
                    padding: 0,
                    fontSize: 11, // уменьшенный размер
                    color: styles.colors.textMain,
                    fontWeight: 900,
                    height: 32,
                },
                tabBarStyle: {
                    backgroundColor: styles.colors.backgroundMain,
                    height: 28,
                    elevation: 0,
                },
                swipeEnabled: true,
                animationEnabled: true,
                lazy: true, // загружает экраны по мере необходимости
            }}
        >
            <Tab.Screen
                name="Notes"
                children={() => <NotesPage />}
                options={{ tabBarLabel: "Мои заметки" }}
            />
            <Tab.Screen
                name="PublicNotes"
                children={() => <NotesPage isPublic={true} />}
                options={{ tabBarLabel: "Публичные заметки" }}
            />
        </Tab.Navigator>
    );
}
