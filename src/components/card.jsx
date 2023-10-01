import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  BanknotesIcon,
  CreditCardIcon,
  WalletIcon,
} from "react-native-heroicons/outline";
import { Accounts, Icon } from "../constants";
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const Card = () => {
  const [currentAcct, setCurrentAcct] = useState("a2");
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.max(0, Math.min(e.translationY, 60));
    })
    .onEnd((e) => {
      translateY.value = withSpring(0);
    });

  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, 60], [1, 0]);

    return {
      transform: [{ translateY: translateY.value }],
      opacity,
    };
  });

  return (
    <View style={styles.cont}>
      {Accounts.map((acct, i) => {
        return (
          <GestureDetector gesture={panGesture}>
            <Animated.View
              entering={FadeInDown.springify().delay(i * 100)}
              key={i}
              style={[
                styles.card,
                {
                  top: i * 20,
                  opacity: (i + 0.4) / 2,
                  backgroundColor: acct.color,
                  width: `${80 + i * 10}%`,
                },
                currentAcct === acct.id && rStyle,
              ]}
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
      })}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cont: {
    paddingVertical: 20,
    position: "relative",
    alignItems: "center",
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
    position: "absolute",
    overflow: "hidden",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,

    // elevation: 10,
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
