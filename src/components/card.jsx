import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Accounts, Icon } from "../constants";
import Animated, {
  Extrapolate,
  FadeInDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Card = () => {
  const inputRange = [0, 60];
  const [currentAcct, setCurrentAcct] = useState("a0");
  const translateY = useSharedValue(0);

  // const moveItemToFront = useCallback(() => {
  //   const itemToMove = Accounts.pop();
  //   Accounts.unshift(itemToMove);
  //   console.log(itemToMove);

  //   console.log(Accounts);
  //   setCurrentAcct(Accounts[2].id);
  // }, []);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((e) => {
          translateY.value = Math.max(0, Math.min(e.translationY, 60));
        })
        .onEnd((e) => {
          translateY.value = withSpring(0, undefined, () => {
            console.log("end");
          });
        }),
    [currentAcct]
  );

  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      inputRange,
      [1, 0],
      Extrapolate.CLAMP
    );
    const width = interpolate(
      translateY.value,
      inputRange,
      [100, 80],
      Extrapolate.CLAMP
    );

    const top = interpolate(translateY.value, inputRange, [40, 0]);

    return {
      transform: [{ translateY: translateY.value }],
      opacity,
      width: `${width}%`,
      top,
    };
  });

  const rStyle2 = useAnimatedStyle(() => {
    const width = interpolate(translateY.value, inputRange, [90, 100]);
    const opacity = interpolate(translateY.value, inputRange, [0.9, 1]);
    const top = interpolate(translateY.value, inputRange, [20, 40]);

    return {
      width: `${width}%`,
      opacity,
      top,
    };
  });

  const rStyle3 = useAnimatedStyle(() => {
    const width = interpolate(translateY.value, inputRange, [80, 90]);
    const opacity = interpolate(translateY.value, inputRange, [0.8, 0.9]);
    const top = interpolate(translateY.value, inputRange, [0, 20]);

    return {
      width: `${width}%`,
      opacity,
      top,
    };
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
                {
                  top: i * 20,
                  backgroundColor: acct.color,
                },
                i === 2 && rStyle,
                i === 1 && rStyle2,
                i === 0 && rStyle3,
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
