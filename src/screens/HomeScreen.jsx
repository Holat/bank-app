import { View, StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/solid";

import { ThemeContext } from "../constants/ThemeContextProvider";
import { Cards, QuickAccess, Transactions } from "../components";
import { Colors } from "../constants/Theme";

const HomeScreen = () => {
  const { theme, userDetails } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();

  const backgroundColor =
    theme === "light" ? Colors.light.background : Colors.dark.background;
  const color = theme === "light" ? Colors.light.text : Colors.dark.text;

  return (
    <View style={{ paddingTop: top, flex: 1, backgroundColor }}>
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
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Agbalumo",
              color,
            }}
          >
            Hello {userDetails.name.split(" ")[0]}👋
          </Text>
          <Text style={{ fontFamily: "MonBold", fontSize: 12, color }}>
            Your financial dreamland...
          </Text>
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    alignItems: "center",
  },
});
