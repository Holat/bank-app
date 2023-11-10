import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../constants/Theme";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { QuickAccessList, QuickAccessIcon } from "../constants";

const PayScreen = () => {
  const { top } = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);

  const borderColor =
    theme === "dark" ? Colors.dark.primary : Colors.light.primary;

  const backgroundColor =
    theme === "light" ? Colors.light.background : Colors.dark.background;
  const color = theme === "light" ? Colors.light.text : Colors.dark.text;

  return (
    <View style={[{ paddingTop: top, backgroundColor, flex: 1 }]}>
      <Text
        style={[
          {
            color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            borderBottomColor: borderColor,
          },
          styles.headerTxt,
        ]}
      >
        Pay Bills
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 15,
          paddingHorizontal: 10,
        }}
      >
        {QuickAccessList.map(({ name, color }, i) => {
          return (
            <View
              key={name}
              style={[
                {
                  backgroundColor:
                    theme === "dark" ? Colors.dark.card : Colors.light.card,
                  borderWidth: theme === "dark" ? 0 : StyleSheet.hairlineWidth,
                },
                styles.cardCont,
              ]}
            >
              <QuickAccessIcon color={color} i={i} />
              <Text
                style={[
                  styles.txt,
                  {
                    color:
                      theme === "dark" ? Colors.dark.text : Colors.light.text,
                  },
                ]}
              >
                {name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PayScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },

  headerTxt: {
    fontSize: 16,
    fontFamily: "MonBold",
    textAlign: "center",
    paddingBottom: 10,
    marginBottom: 25,

    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  cardCont: {
    width: 120,
    height: 100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",

    gap: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderRadius: 5,
  },

  txt: {
    color: "white",
    fontFamily: "MonBold",
    fontSize: 14,
  },
});
