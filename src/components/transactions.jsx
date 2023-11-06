import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  BuildingLibraryIcon,
  RectangleStackIcon,
} from "react-native-heroicons/solid";
import Animated, {
  withTiming,
  useDerivedValue,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import axios from "axios";

import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";
import priceToCurrency from "../utils/pricetoCurrency";

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
            {item.bankname}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.boldTxt,
              {
                color:
                  item.transtype?.toLowerCase() == "credit"
                    ? "green"
                    : item.transtype?.toLowerCase() == "debit" &&
                      theme === "light"
                    ? "black"
                    : "white",
                opacity: 0.7,
              },
            ]}
          >
            {item.transtype?.toLowerCase() == "debit" ? "-" : "+"}${item.amount}
          </Animated.Text>
        </View>
        <View>
          <Animated.Text
            style={[
              { fontFamily: "MonBold", opacity: 0.5, fontSize: 12 },
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
  const [trans, setTrans] = useState([""]);

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

  useEffect(() => {
    axios
      .get(`http://192.168.66.71:3000/transaction/${3}`)
      .then((res) => {
        setTrans(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trans]);

  return (
    <View style={{ flex: 2 }}>
      <Animated.Text style={[styles.header, rTxtStyle]}>
        Transactions
      </Animated.Text>
      {trans.length === 0 ? (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RectangleStackIcon
            color={theme === "dark" ? "#2f2f2f" : "#cccccc"}
            size={120}
          />
          <Text
            style={{
              color: theme === "dark" ? "#2f2f2f" : "#cccccc",
              fontFamily: "RobotoBold",
              fontSize: 20,
              marginBottom: 50,
            }}
          >
            No transaction
          </Text>
        </View>
      ) : (
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
          {trans.map((item, i) => (
            <Card item={item} key={i} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  cont: {
    // flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.8,
    paddingLeft: 20,
    fontFamily: "MonBold",
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
    fontSize: 15,
    fontFamily: "MonBold",
  },
});
