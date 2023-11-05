import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { ChevronRightIcon } from "react-native-heroicons/solid";

const LoginScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const txtColor = theme === "dark" ? Colors.dark.text : Colors.light.text;

  const handlePress = () => {
    if (pin === "3784") {
      navigation.replace("Tab");
    } else {
      setError("Incorrect Pin");
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <View
      style={{
        backgroundColor:
          theme === "dark" ? Colors.dark.background : Colors.light.background,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#023E8A",
          paddingTop: top + 20,
          flex: 1,
        }}
      />
      {error && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutUp}
          style={{
            backgroundColor: Colors.dark.card,
            position: "absolute",
            marginTop: top + 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "red", fontFamily: "MonBold" }}>
            Incorrect Pin
          </Text>
        </Animated.View>
      )}

      <View
        style={{
          paddingHorizontal: 15,
          flex: 6,
          position: "relative",
          alignItems: "center",
        }}
      >
        <View style={styles.loginCont}>
          <Animated.View
            style={[styles.logo, styles.flex]}
            entering={FadeIn.delay(300)}
          >
            <Image
              source={require("../../assets/tree.png")}
              style={{
                width: 80,
                height: 80,
              }}
              resizeMode="cover"
            />
          </Animated.View>
          <Text
            style={{
              color: txtColor,
              fontFamily: "MonBold",
              fontSize: 20,
              marginTop: 30,
            }}
          >
            Alex
          </Text>
          <View style={{}}>
            <Text
              style={{
                color: txtColor,
                fontFamily: "RobotoLight",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Please confirm your PIN to access your
            </Text>
            <Text
              style={{
                color: txtColor,
                fontFamily: "RobotoLight",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Dream Bank Account.
            </Text>
          </View>
          <TextInput
            autoFocus={true}
            maxLength={4}
            style={[
              { backgroundColor: Colors.dark.background },
              styles.txtInput,
            ]}
            secureTextEntry={true}
            keyboardType="numeric"
            caretHidden={true}
            onChangeText={(text) => setPin(text)}
          />
          <Pressable
            onPress={handlePress}
            style={{
              backgroundColor: "#023E8A",
              borderRadius: 10,
              padding: 10,
              paddingLeft: 15,
              marginTop: 10,
            }}
          >
            <ChevronRightIcon color={"white"} size={25} />
          </Pressable>
        </View>
        <Text
          style={{
            marginTop: 20,
            color: "gray",
            position: "absolute",
            top: "50%",
          }}
        >
          You don't have an account?{" "}
          <>
            <Text>Sign Up</Text>
          </>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginCont: {
    gap: 5,
    width: "100%",
    position: "absolute",
    backgroundColor: Colors.dark.bar,
    flex: 1,
    top: 0,
    transform: [{ translateY: -50 }],
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 40,
    alignItems: "center",
  },
  logo: {
    backgroundColor: "white",
    borderColor: "#001c55",
    borderWidth: 4,
    borderRadius: 150,
    width: 70,
    aspectRatio: 1,
  },

  logoTxt: {
    color: "#001c55",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Agbalumo",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  txtInput: {
    borderRadius: 5,
    letterSpacing: 10,
    color: "white",
    paddingHorizontal: 10,
    paddingTop: 3,
    fontSize: 20,
    fontFamily: "MonBold",
    width: 100,
    textAlign: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#023E8A",
    paddingBottom: 7,
  },
});
