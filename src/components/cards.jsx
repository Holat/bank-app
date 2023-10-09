import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Icon, Accounts } from "../constants";
import Animated, {
  Easing,
  Extrapolate,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const CARD_GAP = 22;
const ACCOUNT_LENGTH = Accounts.length;

const Card = ({
  index,
  acct,
  firstPriority,
  secondPriority,
  thirdPriority,
  priority,
}) => {
  const BB = 0;
  const translateY = useSharedValue(BB);

  const gesture = Gesture.Pan()
    .onBegin(({ translationY }) => {
      translateY.value = translationY;
    })
    .onUpdate(({ translationY }) => {
      translateY.value = translationY + BB;
    })
    .onEnd(() => {
      const priorities = [
        firstPriority.value,
        secondPriority.value,
        thirdPriority.value,
      ];

      const lastItem = priorities[priorities.length - 1];
      for (let i = priorities.length - 1; i > 0; i--) {
        priorities[i] = priorities[i - 1];
      }

      priorities[0] = lastItem;

      firstPriority.value = priorities[0];
      secondPriority.value = priorities[1];
      thirdPriority.value = priorities[2];

      translateY.value = withSpring(BB);
    });

  const rStyle = useAnimatedStyle(() => {
    const getPosition = () => {
      switch (priority.value) {
        case 1:
          return 0;
        case 0.9:
          return 15;
        case 0.8:
          return 30;
        default:
          return 0;
      }
    };

    return {
      position: "absolute",
      width: `${priority.value * 100}%`,
      bottom: withTiming(getPosition(), { duration: 500 }),
      zIndex: priority.value * 100,
      transform: [{ translateY: translateY.value }],
      opacity: withTiming(priority.value),
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
    <GestureDetector gesture={gesture}>
      <Animated.View
        entering={FadeInDown.springify().delay(index * 100)}
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
  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);
  return (
    <View style={styles.cont}>
      {Accounts.map((acct, i) => {
        const priority =
          i === 0 ? thirdPriority : i === 1 ? secondPriority : firstPriority;
        return (
          <Card
            index={i}
            acct={acct}
            key={acct.id}
            priority={priority}
            firstPriority={firstPriority}
            secondPriority={secondPriority}
            thirdPriority={thirdPriority}
          />
        );
      })}
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cont: {
    position: "relative",
    alignItems: "center",
    paddingHorizontal: 5,
    flex: 1,
    marginBottom: 20,
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
