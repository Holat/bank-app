import React, { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import ThemeContextProvider from "./src/constants/ThemeContextProvider";
import { useCustomFonts } from "./src/hooks";
import AppNavigation from "./src/navigation";

export default function App() {
  const fontsLoaded = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeContextProvider>
          <BottomSheetModalProvider>
            <AppNavigation />
          </BottomSheetModalProvider>
        </ThemeContextProvider>
      </GestureHandlerRootView>
    </View>
  );
}
