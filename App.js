import AppNavigation from "./src/navigation";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeContextProvider from "./src/constants/ThemeContextProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import useCustomFonts from "./src/hooks/useCustomFonts";

export default function App() {
  const onLayoutRootView = useCustomFonts();

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeContextProvider>
        <BottomSheetModalProvider>
          <AppNavigation />
        </BottomSheetModalProvider>
      </ThemeContextProvider>
    </GestureHandlerRootView>
  );
}
