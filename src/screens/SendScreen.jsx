import {
  ActivityIndicator,
  Pressable,
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
import { ChevronDownIcon, XCircleIcon } from "react-native-heroicons/outline";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../constants/Theme";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { BankListBottomSheet } from "../components";
import { useAccountName } from "../hooks";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SendScreen = () => {
  const { top } = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  const bottomSheetRef = useRef(null);
  const [data, setData] = useState({
    bankName: "",
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

  const handlePresentModalOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleTextInput = (text) => {
    setData({ ...data, acctNo: text });
  };

  const handleClearAcct = () => {
    setData({ ...data, bankName: "", bankCode: "" });
  };

  return (
    <Animated.View style={[rStyle, { paddingTop: top + 20 }, styles.cont]}>
      <Pressable
        onPress={handlePresentModalOpen}
        style={{
          padding: 15,
          backgroundColor: "#3c3c3c",
          margin: 10,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {data.bankName === "" ? (
          <Text
            style={[
              {
                color: "#cccccc",
              },
              styles.bankNamePlaceHolder,
            ]}
          >
            Enter Bank Name
          </Text>
        ) : (
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={[
              {
                color: "white",
              },
              styles.bankNamePlaceHolder,
            ]}
          >
            {data.bankName}
          </Animated.Text>
        )}

        {data.bankCode === "" ? (
          <Pressable onPress={handlePresentModalOpen}>
            <ChevronDownIcon color={"white"} />
          </Pressable>
        ) : (
          <AnimatedPressable
            entering={FadeIn.delay(100)}
            exiting={FadeOut}
            onPress={handleClearAcct}
          >
            <XCircleIcon color={"white"} />
          </AnimatedPressable>
        )}
      </Pressable>
      <TextInput
        placeholder="Enter Account Number"
        placeholderTextColor={"#cccccc"}
        onChangeText={(text) => handleTextInput(text)}
        keyboardType="numeric"
        style={[
          {
            backgroundColor: "#3c3c3c",
            padding: 12,
            margin: 10,
            borderRadius: 10,
            color: "white",
          },
          styles.bankNamePlaceHolder,
        ]}
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

  bankNamePlaceHolder: {
    fontFamily: "MonBold",
    fontSize: 16,
  },
});
