import { ScrollView, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { BuildingLibraryIcon } from "react-native-heroicons/solid";
import Animated, {
  withTiming,
  useDerivedValue,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Trans } from "./trans";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";

const Card = ({ item }) => {
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

  return (
    <Animated.View style={[styles.cont, rStyle]}>
      <View style={styles.icon}>
        <BuildingLibraryIcon color={"white"} size={25} />
      </View>
      <View style={styles.cardCont}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Animated.Text style={[styles.boldTxt, rTxtStyle]}>
            {item.name}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.boldTxt,
              {
                color: item.debitOrCredit === "credit" ? "green" : "red",
                opacity: 0.8,
              },
            ]}
          >
            {item.debitOrCredit === "debit" ? "-" : "+"}${item.amount}
          </Animated.Text>
        </View>
        <View>
          <Animated.Text
            style={[
              { fontFamily: "Mon", fontWeight: "bold", opacity: 0.5 },
              rTxtStyle,
            ]}
          >
            {item.time}
          </Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
};

const Transactions = () => {
  const { theme } = useContext(ThemeContext);
  const progress = useDerivedValue(() => {
    return theme === "light" ? withTiming(0) : withTiming(1);
  }, [theme]);

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
    <View style={{ flex: 2 }}>
      <Animated.Text style={[styles.header, rTxtStyle]}>
        Transactions
      </Animated.Text>
      <ScrollView
        overScrollMode="never"
        contentContainerStyle={{
          borderRadius: 10,
          backgroundColor:
            theme === "dark" ? Colors.dark.card : Colors.light.card,
          gap: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {Trans.map((item, i) => (
          <Card item={item} key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  cont: {
    flex: 3,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.8,
    paddingLeft: 20,
  },
  icon: {
    backgroundColor: "#001c55",
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cardCont: {
    alignItems: "flex-start",
    flex: 1,
  },
  boldTxt: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Mon",
  },
});
