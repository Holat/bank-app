import React from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const Circle = ({ rStyleBtn, priority, firstPriority }) => {
  const rOp = useAnimatedStyle(() => {
    const getOp = () => {
      switch (priority.value) {
        case 1:
          return 1;
        case 0.9:
          return 0.2;
        case 0.8:
          return 0.2;
        default:
          return 0.2;
      }
    };

    const getColor = () => {
      switch (firstPriority.value) {
        case 1:
          return "rgb(0, 28, 85)";
        case 0.9:
          return "rgb(6, 214, 160)";
        case 0.8:
          return "rgb(247, 37, 117)";
        default:
          return "rgb(0, 28, 85)";
      }
    };

    return {
      opacity: withTiming(getOp(), { duration: 300 }),
      height: withTiming(getOp() * 50, { duration: 500 }),
      backgroundColor: withTiming(getColor(), { duration: 400 }),
    };
  });
  return (
    <Animated.View
      style={[{ width: 10, height: 10, borderRadius: 50 }, rStyleBtn, rOp]}
    ></Animated.View>
  );
};

export default Circle;
