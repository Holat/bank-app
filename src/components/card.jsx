import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Icon } from "../constants";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { BlurView } from "expo-blur";
import priceToCurrency from "../utils/pricetoCurrency";

const Card = ({
  index,
  acct,
  firstPriority,
  secondPriority,
  thirdPriority,
  priority,
  balance,
}) => {
  const { showBalance } = useContext(ThemeContext);
  const BB = 0;
  const translateY = useSharedValue(BB);

  const gesture = Gesture.Pan()
    .onBegin(({ translationY }) => {
      translateY.value = translationY;
    })
    .onUpdate(({ translationY }) => {
      translateY.value = Math.max(Math.min(translationY + BB, 20), -40);
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

      translateY.value = withTiming(BB);
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

    const width = interpolate(priority.value, [1, 0.9, 0.8], [100, 90, 80]);

    return {
      position: "absolute",
      width: withTiming(`${width}%`, { duration: 200 }),
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

      elevation: 5,
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
          {showBalance ? (
            <Text style={styles.cardTxt2}>
              {priceToCurrency(balance?.toString())}
            </Text>
          ) : (
            <View style={styles.txtB}>
              <Text style={[styles.cardTxt2, { opacity: 0.2 }]}>
                ${acct.balance}
              </Text>
              <BlurView style={styles.blurStyle} intensity={100}></BlurView>
            </View>
          )}
        </View>
        <Icon i={acct.id} style={styles.backG} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Card;

const styles = StyleSheet.create({
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
    fontFamily: "RobotoMedium",
    marginBottom: 3,
  },

  cardTxt2: {
    color: "white",
    fontSize: 25,
    fontFamily: "MonBold",
  },

  backG: {
    position: "absolute",
    top: -10,
    right: -20,
    transform: [{ rotate: "-45deg" }],
    zIndex: -1,
    opacity: 0.8,
  },

  txtB: {
    overflow: "hidden",
    borderRadius: 5,
    flexDirection: "row",
    alignSelf: "flex-start",
  },

  blurStyle: {
    position: "absolute",
    height: 35,
    width: "100%",
  },
});
