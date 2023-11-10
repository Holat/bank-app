import { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();
const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Agbalumo: require("../../assets/fonts/Agbalumo-Regular.ttf"),
    RobotoThin: require("../../assets/fonts/Roboto-Thin.ttf"),
    RobotoLight: require("../../assets/fonts/Roboto-Light.ttf"),
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    Mon: require("../../assets/fonts/Montserrat-VariableFont_wght.ttf"),
    MonSemibold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    MonBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Teko: require("../../assets/fonts/Teko-VariableFont_wght.ttf"),
  });

  return fontsLoaded;
};

export default useCustomFonts;
