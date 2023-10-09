import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Icon, Accounts } from "../constants";
import Animated, {
  Extrapolate,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";

const CARD_GAP = 22;
const ACCOUNT_LENGTH = Accounts.length;

const Card = ({ index, acct }) => {
  const activeIndex = useSharedValue(0);

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (activeIndex.value === 0) {
        return;
      }

      activeIndex.value = withTiming(activeIndex.value - 1, { duration: 400 });
      console.log(activeIndex.value);
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (activeIndex.value === ACCOUNT_LENGTH) {
        return;
      }

      activeIndex.value = withTiming(activeIndex.value + 1, { duration: 400 });
      console.log(activeIndex.value);
    });

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [0.93, 1, 1]
    );

    const translateY = interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [-CARD_GAP, 0, CARD_GAP]
    );

    const opacity = interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - index * 0.15, 1, 1 - index]
    );

    return {
      position: "absolute",
      zIndex: ACCOUNT_LENGTH - index,
      transform: [{ scale }, { translateY }],
      opacity,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3.84,
      shadowOpacity: 0.25,

      elevation: 8,
    };
  });

  return (
    <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
      <Animated.View
        // entering={FadeInDown.springify().delay(index * 100)}
        style={[styles.card, { backgroundColor: acct.color }, rStyle]}
      >
        <Text style={styles.cardTxt1}>{acct.name} Account</Text>
        <View>
          <Text style={styles.cardTxt1}>Balance: </Text>
          <Text style={styles.cardTxt2}>${acct.balance}</Text>
        </View>
        <Icon i={acct.id} style={styles.backG} />
      </Animated.View>
    </GestureDetector>
  );
};

const Cards = () => {
  return (
    <View style={styles.cont}>
      {Accounts.map((acct, i) => {
        return <Card index={i} acct={acct} key={acct.id} />;
      })}
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cont: {
    // paddingVertical: 20,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    flex: 1,
    marginVertical: 10,
  },

  card: {
    backgroundColor: "#001c55",
    height: 180,
    width: "100%",
    borderRadius: 10,
    padding: 20,
    overflow: "hidden",
    justifyContent: "space-between",
  },

  cardTxt1: {
    color: "white",
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
  },

  cardTxt2: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Mon",
  },

  backG: {
    position: "absolute",
    top: -10,
    right: -20,
    transform: [{ rotate: "-45deg" }],
    zIndex: -1,
    opacity: 0.8,
  },
});
