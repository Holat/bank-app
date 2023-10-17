import AppNavigation from "./src/navigation";
import React, { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeContextProvider from "./src/constants/ThemeContextProvider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "react-native";

export default function App() {
  const [loaded, error] = useFonts({
    RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    Mon: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
    MonBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    Teko: require("./assets/fonts/Teko-VariableFont_wght.ttf"),
  });

  SplashScreen.preventAutoHideAsync();
  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeContextProvider>
        <AppNavigation />
      </ThemeContextProvider>
    </GestureHandlerRootView>
  );
}
