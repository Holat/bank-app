import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/solid";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { ThemeContext } from "../constants/ThemeContextProvider";
import { Cards, QuickAccess, Transactions } from "../components";
import { Colors } from "../constants/Theme";

const HomeScreen = () => {
  const { theme, userDetails } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();

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

  return (
    <Animated.View style={[{ paddingTop: top, flex: 1 }, rStyle]}>
      <View
        style={[
          styles.flex,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 15,
            paddingHorizontal: 15,
          },
        ]}
      >
        <View>
          <Animated.Text
            style={[
              {
                fontSize: 20,
                fontFamily: "Agbalumo",
              },
              rTxtStyle,
            ]}
          >
            Hello {userDetails.name.split(" ")[0]}👋
          </Animated.Text>
          <Animated.Text
            style={[{ fontFamily: "MonBold", fontSize: 12 }, rTxtStyle]}
          >
            Your financial dreamland...
          </Animated.Text>
        </View>
        <UserCircleIcon
          color={"#023E8A"}
          style={{
            backgroundColor:
              theme === "dark" ? Colors.dark.card : Colors.light.card,
            borderRadius: 50,
          }}
          size={35}
        />
      </View>
      <Cards />
      <QuickAccess />
      <Transactions />
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    alignItems: "center",
  },
});
