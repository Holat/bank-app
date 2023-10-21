import { Alert } from "react-native";
import { useEffect, useState } from "react";
import * as ScreenCapture from "expo-screen-capture";
import * as MediaLibrary from "expo-media-library";

const useScreenCapture = () => {
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

  return { isActivated, handleScreenCapture };
};

export default useScreenCapture;
