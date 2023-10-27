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
    debitAcct: "",
  });
  const { name, err, loading } = useAccountName(data);

  const backgroundColor = theme === "dark" ? "#292929" : Colors.light.card;

  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, [])
  );

  const handlePresentModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetRef.current?.close();
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
            borderBottomColor: "grey",
          },
          styles.headerTxt,
        ]}
      >
        Transfer Funds
      </Text>
      <Animated.ScrollView style={{ flexGrow: 1 }}>
        <Text
          style={[
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            },
            styles.label,
          ]}
        >
          Bank Name
        </Text>
        <Pressable
          onPress={handlePresentModal}
          style={[
            {
              backgroundColor,
            },
            styles.pressableInput,
            styles.txtInput,
          ]}
        >
          {data.bankName === "" ? (
            <Text
              style={[
                { color: theme === "dark" ? "#cccccc33" : "#00000033" },
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
            <Pressable onPress={handlePresentModal}>
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
        <Text
          style={[
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            },
            styles.label,
          ]}
        >
          Account Number
        </Text>
        <TextInput
          selectionColor={
            theme === "dark" ? Colors.dark.text : Colors.light.text
          }
          placeholder="Enter Account Number"
          placeholderTextColor={theme === "dark" ? "#cccccc33" : "#00000033"}
          onChangeText={handleTextInput}
          onFocus={handlePresentModalClose}
          keyboardType="numeric"
          style={[
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
              backgroundColor,
            },
            styles.txtInput,
          ]}
        />
        {data.acctNo.length === 10 && data.bankCode !== "" && (
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
                style={[{ color: "red" }, styles.acctNameTxt]}
              >
                Details Incorrect
              </Animated.Text>
            ) : (
              <Animated.Text
                entering={FadeIn}
                style={[{ color: "green" }, styles.acctNameTxt]}
              >
                {name}
              </Animated.Text>
            )}
          </View>
        )}
        <Text
          style={[
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            },
            styles.label,
          ]}
        >
          Debit Account
        </Text>
        <Pressable
          onPress={handlePresentModal}
          style={[
            {
              backgroundColor,
            },
            styles.pressableInput,
            styles.txtInput,
          ]}
        >
          {data.bankName === "" ? (
            <Text
              style={[
                { color: theme === "dark" ? "#cccccc33" : "#00000033" },
                styles.bankNamePlaceHolder,
              ]}
            >
              Bank Account to Debit
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
            <Pressable onPress={handlePresentModal}>
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
        <Text
          style={[
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            },
            styles.label,
          ]}
        >
          Amount(₦)
        </Text>
        <TextInput
          selectionColor={
            theme === "dark" ? Colors.dark.text : Colors.light.text
          }
          placeholder="Enter Amount"
          placeholderTextColor={theme === "dark" ? "#cccccc33" : "#00000033"}
          onChangeText={handleAmountInput}
          value={data.amountStr}
          keyboardType="numeric"
          style={[
            styles.txtInput,
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
              fontSize: 20,
              fontFamily: "MonSemibold",
              backgroundColor,
            },
          ]}
        />
        <Text
          style={[
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            },
            styles.label,
          ]}
        >
          Remarks
        </Text>
        <TextInput
          selectionColor={
            theme === "dark" ? Colors.dark.text : Colors.light.text
          }
          placeholder="Remarks"
          placeholderTextColor={theme === "dark" ? "#cccccc33" : "#00000033"}
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
        <Pressable
          style={[
            {
              backgroundColor:
                theme === "dark" ? Colors.dark.primary : Colors.light.primary,
            },
            styles.sendBtn,
          ]}
        >
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
      </Animated.ScrollView>
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
  pressableInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderWidth: 1,
  },
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
    fontFamily: "MonSemibold",
    fontSize: 18,
  },

  txtInput: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 15,
    marginBottom: 20,
    fontFamily: "MonSemibold",
    fontSize: 18,
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
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

  label: {
    fontFamily: "MonBold",
    marginBottom: 5,
    marginLeft: 18,
    opacity: 0.7,
  },
});
