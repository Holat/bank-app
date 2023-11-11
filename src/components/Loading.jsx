import { View, Dimensions } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressBar from "react-native-progress/Bar";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

const Loading = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        paddingTop: top,
        backgroundColor: "#00000033",
        height,
        zIndex: 100,
      }}
    >
      <ProgressBar
        progress={0.3}
        width={width}
        indeterminate={true}
        borderWidth={0}
        borderRadius={0}
        animationType={"timing"}
        color={"green"}
        unfilledColor={"#023E8A8A"}
      />
    </View>
  );
};

export default Loading;
