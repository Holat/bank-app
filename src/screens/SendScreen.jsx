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
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import { Colors } from "../constants/Theme";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { BankListBottomSheet } from "../components";
import { useAccountName } from "../hooks";
import priceToCurrency from "../utils/pricetoCurrency";
import { Accounts } from "../constants";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SendScreen = () => {
  const { top } = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const Acct = Accounts.slice().reverse();
  const [data, setData] = useState({
    bankName: "",
    bankCode: "",
    acctNo: "",
    amount: 0,
    amountStr: "",
    remark: "",
    debitAcct: Acct[0].name,
    debitAcctBalance: Acct[0].balance,
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
      <ScrollView>
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
              <ChevronDownIcon
                color={theme === "dark" ? "#cccccc33" : "#00000033"}
              />
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
          onPress={() => setIsOpen(true)}
          style={[
            styles.pressableInput,
            styles.txtInput,
            {
              backgroundColor,
              position: "relative",
              zIndex: 1,
              paddingHorizontal: 0,
            },
          ]}
        >
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={[
              {
                color: theme === "dark" ? Colors.dark.text : Colors.light.text,
                marginLeft: 10,
              },
              styles.bankNamePlaceHolder,
            ]}
          >
            {data.debitAcct} ~ ₦{data.debitAcctBalance}
          </Animated.Text>
          {!isOpen ? (
            <Pressable
              onPress={() => setIsOpen((prev) => !prev)}
              style={{ marginRight: 10 }}
            >
              <ChevronDownIcon
                color={theme === "dark" ? "#cccccc33" : "#00000033"}
              />
            </Pressable>
          ) : (
            <AnimatedPressable
              entering={FadeIn.delay(100)}
              exiting={FadeOut}
              onPress={() => setIsOpen((prev) => !prev)}
              style={{ marginRight: 10 }}
            >
              <XCircleIcon color={"green"} />
            </AnimatedPressable>
          )}
          <Animated.View
            entering={FadeInDown}
            style={[
              {
                backgroundColor,
                display: isOpen ? "flex" : "none",
              },
              styles.dropDown,
            ]}
          >
            {Acct.map(({ name, balance }, i) => (
              <Pressable
                key={name}
                onPress={() => {
                  setData({
                    ...data,
                    debitAcct: name,
                    debitAcctBalance: balance,
                  });
                  setIsOpen(false);
                }}
                style={[
                  {
                    borderColor: "grey",
                  },
                  styles.dropDownBtn,
                  data.debitAcct === name && { borderColor: "green" },
                ]}
              >
                <Text
                  style={[
                    {
                      color:
                        theme === "dark" ? Colors.dark.text : Colors.light.text,
                      fontFamily: "RobotoBold",
                      fontSize: 18,
                      opacity: 0.7,
                    },
                    data.debitAcct === name && { color: "green" },
                  ]}
                >
                  {name} ~ ₦{balance}
                </Text>
                {data.debitAcct === name && <CheckCircleIcon color={"green"} />}
              </Pressable>
            ))}
          </Animated.View>
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

  dropDown: {
    width: "100%",
    position: "absolute",
    top: 42,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 1,
    padding: 15,
  },

  dropDownBtn: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
});
