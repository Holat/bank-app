import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import ThemeContextProvider from "./src/constants/ThemeContextProvider";
import { useCustomFonts, usePref } from "./src/hooks";
import AppNavigation from "./src/navigation";

export default function App() {
  const [themeLoaded, setThemeLoaded] = useState(false);
  const fontsLoaded = useCustomFonts();
  const themePref = usePref();

  useEffect(() => {
    if (themePref) {
      setThemeLoaded(true);
    }
  }, [themePref]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && themeLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, themeLoaded]);

  if (!fontsLoaded || !themeLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeContextProvider themePref={themePref}>
          <BottomSheetModalProvider>
            <AppNavigation />
          </BottomSheetModalProvider>
        </ThemeContextProvider>
      </GestureHandlerRootView>
    </View>
  );
}
