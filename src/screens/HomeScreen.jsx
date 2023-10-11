import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Cards, Transactions } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { Colors } from "../constants/Theme";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemeContext } from "../constants/ThemeContextProvider";

const HomeScreen = () => {
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

  const rTxtStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [1, 0],
      [Colors.light.background, Colors.dark.background]
    );

    return {
      color,
    };
  });

  const { top } = useSafeAreaInsets();
  return (
    <Animated.View style={[styles.cont, { paddingTop: top }, rStyle]}>
      <View
        style={[
          styles.flex,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 15,
          },
        ]}
      >
        <View>
          <Animated.Text
            style={[
              {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto-Medium",
              },
              rTxtStyle,
            ]}
          >
            Hello Alex👋
          </Animated.Text>
          <Animated.Text
            style={[{ fontFamily: "Roboto-Medium", fontSize: 12 }, rTxtStyle]}
          >
            Your financial dreamland ...
          </Animated.Text>
        </View>
        <UserCircleIcon
          color={"#001c55"}
          style={{
            backgroundColor: "white",
            borderRadius: 50,
          }}
          size={35}
        />
      </View>
      <Cards />
      <Transactions />
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 15,
  },

  flex: {
    display: "flex",
    alignItems: "center",
  },
});
