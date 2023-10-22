import { Alert } from "react-native";
import { useEffect, useState } from "react";
import {
  addScreenshotListener,
  preventScreenCaptureAsync,
  allowScreenCaptureAsync,
} from "expo-screen-capture";
import * as MediaLibrary from "expo-media-library";

const useScreenCapture = () => {
  const [isActivated, setIsActivated] = useState(true);

  const hasPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  };

  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermission = await hasPermissions();
      if (hasPermission) {
        const subscription = addScreenshotListener(() => {
          Alert.alert("Thanks for taking a screenshot");
        });
        return () => subscription.remove();
      }
    };

    checkPermissions();
  }, []);

  const activate = async () => {
    await preventScreenCaptureAsync("screen");
  };

  const deactivate = async () => {
    await allowScreenCaptureAsync("screen");
  };

  const handleScreenCapture = async () => {
    setIsActivated((prev) => !prev);

    if (isActivated) activate();
    else deactivate();
  };

  return { isActivated, handleScreenCapture };
};

export default useScreenCapture;
