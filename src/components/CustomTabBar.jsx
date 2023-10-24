import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import Animated, {
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";
import TabBarIcon from "./TabBarIcons";

const Bar = ({ route, i, props, theme }) => {
  const isActive = i === props.state.index;

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: isActive ? withTiming(1, { duration: 300 }) : withTiming(0.6),
    };
  });

  const rIconStyle = useAnimatedStyle(() => {
    return {
      opacity: isActive ? withTiming(1, { duration: 300 }) : withTiming(0),
    };
  });

  return (
    <Pressable
      key={route.key}
      onPress={() => props.navigation.navigate(route.name)}
      style={styles.btnCont}
    >
      <View
        style={{
          alignItems: "center",
          gap: 5,
        }}
      >
        <TabBarIcon
          color={theme === "dark" ? "white" : "#001c55"}
          rStyle={rStyle}
          i={i}
        />
        <Animated.View
          style={[
            {
              width: 8,
              height: 8,
              borderRadius: 50,
              backgroundColor: isActive ? "#001c55" : "#202020",
            },
            rIconStyle,
          ]}
        ></Animated.View>
      </View>
    </Pressable>
  );
};

const CustomTabBar = (props) => {
  const { theme } = useContext(ThemeContext);
  const progress = useDerivedValue(() => {
    return theme === "light" ? withTiming(0) : withTiming(1);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [1, 0],
      [Colors.dark.bar, Colors.light.card]
    );

    return {
      backgroundColor,
    };
  });
  return (
    <Animated.View style={[styles.cont, rStyle]}>
      {props.state.routes.map((route, i) => {
        return (
          <Bar
            key={route.name}
            props={props}
            route={route}
            i={i}
            theme={theme}
          />
        );
      })}
    </Animated.View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
