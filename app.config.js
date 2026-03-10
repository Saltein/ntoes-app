import "dotenv/config";

export default ({ config }) => ({
    expo: {
        name: "notes-app",
        slug: "ntoes-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash-icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                backgroundColor: "#E6F4FE",
                foregroundImage: "./assets/android-icon-foreground.png",
                backgroundImage: "./assets/android-icon-background.png",
                monochromeImage: "./assets/android-icon-monochrome.png",
            },
            predictiveBackGestureEnabled: false,
            package: "com.saltein.notesapp",
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            eas: {
                projectId: "e54bbc5b-05cf-484f-b1f4-2121925b854d",
                apiBaseUrl: process.env.EXPO_PUBLIC_BASE_URL || "http://90.156.202.223:3001/api/"
            },
        },
    },
});
