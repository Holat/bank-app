import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../constants/Theme";
import { ThemeContext } from "../constants/ThemeContextProvider";

const PayScreen = () => {
  const { top } = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);

  const progress = useDerivedValue(() => {
    return theme === "light" ? withTiming(0) : withTiming(1);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [1, 0],
      [Colors.dark.background, Colors.light.background]
    );

    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[rStyle, { paddingTop: top }, styles.cont]}>
      <Text>PayScreen</Text>
    </Animated.View>
  );
};

export default PayScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
});
