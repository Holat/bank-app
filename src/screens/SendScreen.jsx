import { StyleSheet, Text, Button, TextInput, View } from "react-native";
import React, { useContext, useRef, useCallback, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolateColor,
  ZoomIn,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Theme";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { BankListBottomSheet } from "../components";

const SendScreen = () => {
  const { top } = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  const bottomSheetRef = useRef(null);
  const [bankName, setBankName] = useState("Enter Bank Name");

  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, [])
  );

  const progress = useDerivedValue(() => {
    return theme === "light" ? withTiming(0) : withTiming(1);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [1, 0],
      [Colors.dark.background, Colors.light.background]
    );

    return {
      backgroundColor,
    };
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <Animated.View style={[rStyle, { paddingTop: top + 20 }, styles.cont]}>
      <View
        style={{
          padding: 15,
          backgroundColor: "#3c3c3c",
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Text
          onPress={handlePresentModalPress}
          style={{
            color: "white",
          }}
        >
          {bankName}
        </Text>
      </View>
      <TextInput
        placeholder="Enter Account Number"
        placeholderTextColor={"white"}
        // onChangeText={(text) => handleSearch(text)}
        style={{
          backgroundColor: "#3c3c3c",
          padding: 12,
          margin: 10,
          borderRadius: 10,
        }}
      />
      <BankListBottomSheet
        bottomSheetRef={bottomSheetRef}
        theme={theme}
        setBankName={setBankName}
      />
    </Animated.View>
  );
};

export default SendScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
});
