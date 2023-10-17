import AppNavigation from "./src/navigation";
import { View } from "react-native";
import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeContextProvider from "./src/constants/ThemeContextProvider";
import { Text } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    Mon: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
    Teko: require("./assets/fonts/Teko-VariableFont_wght.ttf"),
  });

  SplashScreen.preventAutoHideAsync();
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContextProvider>
        <AppNavigation />
      </ThemeContextProvider>
    </GestureHandlerRootView>
  );
}
