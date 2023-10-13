import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/solid";
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
  const { theme, setTheme, showBalance, setShowBalance } =
    useContext(ThemeContext);
  const [themeToggle, setThemeToggle] = useState(true);

  const changeTheme = () => {
    setThemeToggle((prev) => !prev);
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
    <Animated.View style={[{ flex: 1 }, rStyle]}>
      <Animated.View
        style={{
          padding: 18,
          paddingTop: top + 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View>
            <Text
              style={[
                styles.headerTxt,
                { fontSize: 20, fontWeight: "bold", color: "white" },
              ]}
            >
              My Account,
            </Text>
            <Text
              style={[
                styles.headerTxt,
                { fontSize: 14, fontWeight: "500", color: "white" },
              ]}
            >
              Alex Walter
            </Text>
          </View>
          <View style={styles.iconCont}>
            <UserCircleIcon color={"#001c55"} size={52} />
          </View>
        </View>
        <View style={styles.switchCont}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Show Account Balance
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={setShowBalance ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={() => setShowBalance((prev) => !prev)}
            value={showBalance}
          />
        </View>
        <View style={styles.switchCont}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Enable Dark Mode
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={setShowBalance ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={changeTheme}
            value={themeToggle}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  iconCont: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 41,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },

  switchCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
