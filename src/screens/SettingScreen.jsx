import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SunIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../constants/ThemeContextProvider";
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { Colors } from "../constants/Theme";

const Settings = () => {
  const { top } = useSafeAreaInsets();
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

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
    <Animated.View style={[{ paddingTop: top, flex: 1 }, rStyle]}>
      <TouchableOpacity onPress={changeTheme}>
        <SunIcon color={theme === "dark" ? "white" : "black"} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Settings;
