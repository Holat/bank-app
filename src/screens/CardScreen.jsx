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
import { CreditCard } from "../components";

const CardScreen = () => {
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
    <Animated.View style={[rStyle, { paddingTop: top + 20 }, styles.cont]}>
      <CreditCard />
    </Animated.View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
