import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useRef, useCallback, useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { ChevronDownIcon, XCircleIcon } from "react-native-heroicons/outline";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import { Colors } from "../constants/Theme";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { BankListBottomSheet } from "../components";
import { useAccountName } from "../hooks";
import priceToCurrency from "../utils/pricetoCurrency";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SendScreen = () => {
  const { top } = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  const bottomSheetRef = useRef(null);
  const [data, setData] = useState({
    bankName: "",
    bankCode: "",
    acctNo: "",
    amount: 0,
    amountStr: "",
    remark: "",
  });
  const { name, err, loading } = useAccountName(data);

  const borderColor =
    theme === "dark" ? Colors.dark.primary : Colors.light.primary;
  const backgroundColor = theme === "dark" ? Colors.dark.card : "white";

  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, [])
  );

  const handlePresentModalOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleTextInput = (text) => {
    setData({ ...data, acctNo: text });
  };

  const handleClearAcct = () => {
    setData({ ...data, bankName: "", bankCode: "" });
  };

  const handleAmountInput = (num) => {
    if (num !== "") {
      setData({
        ...data,
        amount: parseFloat(num),
        amountStr: priceToCurrency(num),
      });
    } else {
      setData({
        ...data,
        amount: 0,
        amountStr: "",
      });
    }
  };

  return (
    <View
      style={[
        {
          paddingTop: top + 10,
          backgroundColor:
            theme === "dark" ? Colors.dark.background : Colors.light.background,
          flex: 1,
        },
      ]}
    >
      <Text
        style={[
          {
            color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            borderBottomColor: borderColor,
          },
          styles.headerTxt,
        ]}
      >
        Transfer Funds
      </Text>
      <ScrollView>
        <Pressable
          onPress={handlePresentModalOpen}
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 20,
              borderColor,
              borderWidth: 1,
              backgroundColor,
            },
            styles.txtInput,
          ]}
        >
          {data.bankName === "" ? (
            <Text style={[{ color: "#cccccc" }, styles.bankNamePlaceHolder]}>
              Enter Bank Name
            </Text>
          ) : (
            <Animated.Text
              entering={FadeIn}
              exiting={FadeOut}
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
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
              <XCircleIcon color={"green"} />
            </AnimatedPressable>
          )}
        </Pressable>
        <TextInput
          placeholder="Enter Account Number"
          placeholderTextColor={"#cccccc"}
          onChangeText={handleTextInput}
          onFocus={() => bottomSheetRef?.current.close()}
          keyboardType="numeric"
          style={[
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
              borderColor,
              borderWidth: 1,
              backgroundColor,
            },
            styles.txtInput,
          ]}
        />
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 20,
            gap: 5,
            marginBottom: 5,
          }}
        >
          {loading && <ActivityIndicator color={"green"} size={15} />}
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
              style={[{ color: "green" }, styles.acctNameTxt]}
            >
              {name}
            </Animated.Text>
          )}
        </View>
        <TextInput
          placeholder="Enter Amount"
          placeholderTextColor={"#cccccc"}
          onChangeText={handleAmountInput}
          value={data.amountStr}
          keyboardType="numeric"
          style={[
            styles.txtInput,
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
              fontSize: 20,
              fontFamily: "MonBold",
              backgroundColor,
            },
          ]}
        />
        <TextInput
          placeholder="Remarks"
          placeholderTextColor={"#cccccc"}
          numberOfLines={5}
          onChangeText={(text) => setData({ ...data, remark: text })}
          style={[
            styles.txtInput,
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
              backgroundColor,
              verticalAlign: "top",
              paddingLeft: 15,
              borderRadius: 5,
              fontSize: 16,
            },
          ]}
        />
        <Pressable style={[{ backgroundColor: borderColor }, styles.sendBtn]}>
          <Text
            style={{
              fontFamily: "MonBold",
              color: "white",
              fontSize: 16,
            }}
          >
            Send Money
          </Text>
        </Pressable>
      </ScrollView>
      <BankListBottomSheet
        bottomSheetRef={bottomSheetRef}
        theme={theme}
        setData={setData}
      />
    </View>
  );
};

export default SendScreen;

const styles = StyleSheet.create({
  headerTxt: {
    fontSize: 16,
    fontFamily: "MonBold",
    textAlign: "center",
    paddingBottom: 10,
    marginBottom: 25,

    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  acctNameTxt: {
    textTransform: "capitalize",
    fontFamily: "MonBold",
  },

  bankNamePlaceHolder: {
    fontFamily: "RobotoRegular",
    fontSize: 18,
  },

  txtInput: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    fontFamily: "RobotoRegular",
    fontSize: 18,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  sendBtn: {
    borderRadius: 5,
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    overflow: "hidden",
  },
});
