import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { IP } from "@env";
import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { getData } from "../utils/asyncStorage";
import { Loading, Error } from "../components";

const LoginScreen = ({ navigation }) => {
  const { theme, setUserDetails } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    password: "",
    email: "",
    name: "",
    id: null,
  });

  const txtColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const backgroundColor = theme === "dark" ? "#292929" : Colors.light.card;
  const errBck =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  const handleSubmit = () => {
    if (values.password.length === 4 && values.email.trim()) {
      Keyboard.dismiss();
      setLoading(true);
      axios
        .post(`http://${IP}/login`, values)
        .then((res) => {
          if (res.data.Status === "Success") {
            navigation.replace("Tab");
          } else {
            setError(res.data.Error);
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Incomplete Pin");
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("userDetails");
      if (data) {
        const { email, id, name } = data;
        setValues({ ...values, email, id, name });
        setUserDetails({ name, id, email });
      } else {
        navigation.push("Signin");
      }
    };

    fetchData();
  }, []);

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
      {loading && <Loading />}
      <View
        style={{
          backgroundColor: "#023E8A",
          paddingTop: top + 20,
          flex: 1,
        }}
      />
      {error && <Error error={error} backgroundColor={errBck} />}
      <View
        style={{
          paddingHorizontal: 15,
          flex: 6,
          position: "relative",
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.loginCont,
            {
              backgroundColor:
                theme === "dark" ? Colors.dark.bar : Colors.light.card,
            },
          ]}
        >
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
            {values.name?.split(" ")[0]}
          </Text>
          <View>
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
            style={[{ backgroundColor, color: txtColor }, styles.txtInput]}
            secureTextEntry={true}
            keyboardType="numeric"
            caretHidden={true}
            onChangeText={(text) => setValues({ ...values, password: text })}
          />
          <Pressable
            onPress={handleSubmit}
            style={{
              backgroundColor: "#023E8A",
              borderRadius: 5,
              paddingVertical: 10,
              marginTop: 10,
              width: 100,
            }}
          >
            <Text
              style={{
                fontFamily: "MonBold",
                fontSize: 18,
                textAlign: "center",
                color: "white",
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.push("Signin")}>
            <Text
              style={{
                marginTop: 10,
                color: "#023E8A",
                fontFamily: "MonBold",
                fontSize: 16,
              }}
            >
              Sign in another account
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 20,
            position: "absolute",
            bottom: "5%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "gray",
            }}
          >
            You don't have an account?{" "}
          </Text>
          <Pressable onPress={() => navigation.replace("Signup")}>
            <Text
              style={{
                color: "#023E8A",
                fontFamily: "MonBold",
                fontSize: 16,
              }}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
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
    flex: 1,
    top: 0,
    transform: [{ translateY: -50 }],
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 20,
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
