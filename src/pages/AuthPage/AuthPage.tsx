import { View } from "react-native";
import { s } from "./AuthPageStyles";
import { AuthForm } from "../../features";

export function AuthPage() {
    return (
        <View style={s.container}>
            <AuthForm />
        </View>
    );
}
