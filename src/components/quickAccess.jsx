import { StyleSheet, View, Text } from "react-native";
import React, { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";

import { QuickAccessIcon, QuickAccessList } from "../constants";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";
const QuickAccess = () => {
  const { theme } = useContext(ThemeContext);
  const txtColor = theme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <View style={styles.cont}>
      <Text style={[styles.quickAHeader, { color: txtColor }]}>
        Quick Access
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{
          gap: 15,
          padding: 5,
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
                  borderColor: theme === "dark" ? "grey" : "#001c55",
                },
                styles.cardCont,
              ]}
            >
              <QuickAccessIcon color={color} i={i} />
              <Text style={[styles.txt, { color: txtColor }]}>{name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default QuickAccess;

const styles = StyleSheet.create({
  cont: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },

  quickAHeader: {
    color: "white",
    fontSize: 12,
    paddingLeft: 5,
    opacity: 0.5,
  },

  cardCont: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    overflow: "hidden",
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
  },

  txt: {
    color: "white",
    fontFamily: "MonBold",
    fontSize: 14,
  },
});
