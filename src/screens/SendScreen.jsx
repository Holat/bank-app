import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useRef, useCallback, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolateColor,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Theme";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { BankListBottomSheet } from "../components";
import useAccountName from "../hooks/useAccountName";

const SendScreen = () => {
  const { top } = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  const bottomSheetRef = useRef(null);
  const [data, setData] = useState({
    bankName: "Enter Bank Name",
    bankCode: "",
    acctNo: "",
  });
  const { name, err, loading } = useAccountName(data);

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

  const handleTextInput = (text) => {
    setData({ ...data, acctNo: text });
  };

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
          {data.bankName}
        </Text>
      </View>
      <TextInput
        placeholder="Enter Account Number"
        placeholderTextColor={"white"}
        onChangeText={(text) => handleTextInput(text)}
        keyboardType="numeric"
        style={{
          backgroundColor: "#3c3c3c",
          padding: 12,
          margin: 10,
          borderRadius: 10,
        }}
      />
      <View style={{ flexDirection: "row", paddingLeft: 20, gap: 5 }}>
        {(loading || name === "") && data.acctNo.length === 10 && !err ? (
          <ActivityIndicator color={"green"} size={15} />
        ) : null}
        {err ? (
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={[{ color: "red" }, styles.acctNameTxt]}
          >
            Details Incorrect
          </Animated.Text>
        ) : (
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={[
              {
                color: "green",
              },
              styles.acctNameTxt,
            ]}
          >
            {name}
          </Animated.Text>
        )}
      </View>

      <BankListBottomSheet
        bottomSheetRef={bottomSheetRef}
        theme={theme}
        setData={setData}
      />
    </Animated.View>
  );
};

export default SendScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },

  acctNameTxt: {
    textTransform: "capitalize",
    fontFamily: "MonBold",
  },
});
