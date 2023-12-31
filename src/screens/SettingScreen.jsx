import { View, StyleSheet, Pressable, Text } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { Switch } from "react-native-gesture-handler";
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";
import { useScreenCapture } from "../hooks";
import { setPref } from "../utils/asyncStorage";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Settings = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const { theme, setTheme, showBalance, setShowBalance, userDetails } =
    useContext(ThemeContext);
  const { isActivated, handleScreenCapture } = useScreenCapture();

  const changeTheme = async (isDark) => {
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    await setPref("theme", newTheme);
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

  const rHeaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [1, 0],
      [Colors.dark.bar, Colors.light.card]
    );

    return {
      backgroundColor,
    };
  });

  const rTxtStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [1, 0],
      [Colors.dark.text, Colors.light.text]
    );

    return {
      color,
      opacity: 0.8,
    };
  });

  return (
    <Animated.View style={[{ flex: 1 }, rStyle]}>
      <Animated.View
        style={[
          {
            padding: 18,
            paddingTop: top + 10,
          },
          rHeaderStyle,
        ]}
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
            <Animated.Text
              style={[
                styles.headerTxt,
                { fontSize: 20, fontWeight: "bold", color: "white" },
                rTxtStyle,
              ]}
            >
              My Account,
            </Animated.Text>
            <Animated.Text
              style={[
                styles.headerTxt,
                { fontSize: 14, fontWeight: "500", color: "white" },
                rTxtStyle,
              ]}
            >
              {userDetails.name}
            </Animated.Text>
          </View>
          <View style={styles.iconCont}>
            <UserCircleIcon color={"#023E8A"} size={52} />
          </View>
        </View>
        <View style={styles.switchCont}>
          <Animated.Text style={[{ fontWeight: "bold" }, rTxtStyle]}>
            Show Account Balance
          </Animated.Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={showBalance ? "#023E8A" : "#f4f3f4"}
            onValueChange={() => setShowBalance((prev) => !prev)}
            value={showBalance}
          />
        </View>
        <View style={styles.switchCont}>
          <Animated.Text style={[{ fontWeight: "bold" }, rTxtStyle]}>
            Enable Dark Mode
          </Animated.Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={theme === "dark" ? "#023E8A" : "#f4f3f4"}
            onValueChange={changeTheme}
            value={theme === "dark"}
          />
        </View>
        <View style={styles.switchCont}>
          <Animated.Text style={[{ fontWeight: "bold" }, rTxtStyle]}>
            Allow Screenshot
          </Animated.Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isActivated ? "#023E8A" : "#f4f3f4"}
            onValueChange={handleScreenCapture}
            value={isActivated}
          />
        </View>
      </Animated.View>
      <AnimatedPressable
        onPress={() => navigation.replace("Login")}
        style={[
          {
            alignSelf: "center",
            marginTop: 20,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
          },
          rHeaderStyle,
        ]}
      >
        <Text style={{ color: "red", fontFamily: "MonBold" }}>Log Out</Text>
      </AnimatedPressable>
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
