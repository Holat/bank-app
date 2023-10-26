import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const useCustomFonts = () => {
  const [loaded] = useFonts({
    RobotoThin: require("../../assets/fonts/Roboto-Thin.ttf"),
    RobotoLight: require("../../assets/fonts/Roboto-Light.ttf"),
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    Mon: require("../../assets/fonts/Montserrat-VariableFont_wght.ttf"),
    MonBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Teko: require("../../assets/fonts/Teko-VariableFont_wght.ttf"),
    Agbalumo: require("../../assets/fonts/Agbalumo-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return onLayoutRootView;
};

export default useCustomFonts;
