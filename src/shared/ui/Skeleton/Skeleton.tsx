import React, { useEffect, useRef } from "react";
import { View, StyleProp, ViewStyle, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../styles/styles";
import { pastelColors } from "../../consts";
import { invertColorWithBrightness } from "../../../entities/note/utils/invertColorWithBrightness";

interface SkeletonProps {
    style?: StyleProp<ViewStyle>;
    hasBorder?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ style, hasBorder }) => {
    const translateX = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
        ).start();
    }, []);

    const animatedStyle = {
        transform: [
            {
                translateX: translateX.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-300, 300],
                }),
            },
        ],
    };

    const randomColor = pastelColors[Math.floor(Math.random() * 24)];

    const borderStyle = hasBorder
        ? {
              borderColor: invertColorWithBrightness(randomColor, 0.3),
              borderWidth: 1,
          }
        : {};

    return (
        <View
            style={[
                s.container,
                style,
                {
                    backgroundColor: randomColor,
                },
                borderStyle,
            ]}
        >
            <Animated.View style={[s.gradientWrapper, animatedStyle]}>
                <LinearGradient
                    colors={["#fff0", "#fff9", "#fff0"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={s.gradient}
                />
            </Animated.View>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        overflow: "hidden",
        borderRadius: 8,
        height: "100%",
        width: "100%",
    },
    gradientWrapper: StyleSheet.absoluteFill,
    gradient: {
        flex: 1,
        width: "100%",
    },
});
