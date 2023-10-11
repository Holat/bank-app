import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { BuildingLibraryIcon } from "react-native-heroicons/solid";
import { Trans } from "./trans";
import { ThemeContext } from "../constants/ThemeContextProvider";
import Animated, {
  withTiming,
  useDerivedValue,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
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
              { color: item.debitOrCredit === "credit" ? "green" : "red" },
              rTxtStyle,
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
        contentContainerStyle={{
          gap: 5,
          paddingBottom: 10,
          borderRadius: 10,
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
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
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
