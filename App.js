import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeContextProvider from "./src/constants/ThemeContextProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useCustomFonts } from "./src/hooks";
import AppNavigation from "./src/navigation";

export default function App() {
  const onLayoutRootView = useCustomFonts();

  // console.log(BANK_APP);

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
