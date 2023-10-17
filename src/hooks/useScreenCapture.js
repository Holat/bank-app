import { View, Text, Alert } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as ScreenCapture from "expo-screen-capture";
import * as MediaLibrary from "expo-media-library";
import Animated from "react-native-reanimated";

const UseScreenCapture = ({ rTxtStyle }) => {
  const [isActivated, setIsActivated] = useState(true);

  useEffect(() => {
    if (hasPermissions()) {
      const subscription = ScreenCapture.addScreenshotListener(() => {
        Alert("thanks for screen shotting");
      });
      return () => subscription.remove();
    }
  }, []);

  const hasPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  };

  const activate = async () => {
    await ScreenCapture.preventScreenCaptureAsync();
    console.log("screen shot deactivated");
  };

  const deactivate = async () => {
    await ScreenCapture.allowScreenCaptureAsync();
    console.log("activated");
  };

  const handleScreenCapture = async () => {
    setIsActivated((prev) => !prev);

    if (isActivated) activate();
    else deactivate();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Animated.Text style={[{ fontWeight: "bold" }, rTxtStyle]}>
        Allow Screenshot
      </Animated.Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isActivated ? "#023E8A" : "#f4f3f4"}
        onValueChange={handleScreenCapture}
        value={isActivated}
      />
    </View>
  );
};

export default UseScreenCapture;
