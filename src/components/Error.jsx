import { Text } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Error = ({ error, backgroundColor }) => {
  const { top } = useSafeAreaInsets();

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={{
        backgroundColor,
        position: "absolute",
        marginTop: top + 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: "center",
      }}
    >
      <Text style={{ color: "red", fontFamily: "MonBold" }}>{error}</Text>
    </Animated.View>
  );
};

export default Error;
