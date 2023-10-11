import React from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const Circle = ({ rStyleBtn, priority }) => {
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

    return {
      opacity: withTiming(getOp(), { duration: 300 }),
      height: withTiming(getOp() * 50, { duration: 500 }),
    };
  });
  return (
    <Animated.View
      style={[
        { backgroundColor: "green", width: 10, height: 10, borderRadius: 50 },
        rStyleBtn,
        rOp,
      ]}
    ></Animated.View>
  );
};

export default Circle;
