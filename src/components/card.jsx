import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "../constants";
import Animated, {
  FadeInDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const Card = () => {
  const Accounts = [
    {
      id: "a0",
      name: "Current",
      balance: "10,000",
      color: "#001c55",
    },
    {
      id: "a1",
      name: "Savings",
      balance: "50,000",
      color: "#F72585",
    },
    {
      id: "a2",
      name: "others",
      balance: "10,000",
      color: "#06D6A0",
    },
  ];
  const [currentAcct, setCurrentAcct] = useState("a0");
  const translateY = useSharedValue(0);
  const stackOrder = [3, 2, 1];
  const inputRange = [0, 60];

  const move = useEffect(() => {
    Accounts.unshift(Accounts[2]);
    Accounts.pop();
    console.log(Accounts);
  }, [Accounts]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((e) => {
          translateY.value = Math.max(0, Math.min(e.translationY, 60));
        })
        .onEnd((e) => {
          if (translateY.value >= 60) {
            // runOnJS(move)();
            translateY.value = 0;
          } else {
            translateY.value = withSpring(0);
          }
        }),
    []
  );

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const cardStyles = Accounts.map((_, i) => {
    const opacity = interpolate(translateY.value, [0, 60], [1, 0]);
    const zIndex = i === 0 ? 3 : i === 1 ? 2 : 1;
    const width = interpolate(translateY.value, [0, 60], [100, 80]);

    return useAnimatedStyle(() => ({
      opacity,
      width: `${width}%`,
      zIndex,
    }));
  });

  return (
    <View style={styles.cont}>
      {Accounts.map((acct, i) => {
        return (
          <GestureDetector gesture={panGesture} key={acct.id}>
            <Animated.View
              entering={FadeInDown.springify().delay(i * 100)}
              style={[
                styles.card,
                cardStyles[i],
                i === 0 && rStyle,
                {
                  backgroundColor: acct.color,
                  top: i * 20,
                },
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
