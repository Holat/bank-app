import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../constants/Theme";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { CreditCard, Loading } from "../components";

const CardScreen = () => {
  const { top } = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);

  const backgroundColor =
    theme === "light" ? Colors.light.background : Colors.dark.background;

  return (
    <View style={[{ paddingTop: top + 20, backgroundColor }, styles.cont]}>
      <CreditCard />
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
