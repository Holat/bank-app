import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";

import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";
import { storeData } from "../utils/asyncStorage";
import { IP } from "@env";
import { Loading, Error } from "../components";

const SignupScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  });
  const backgroundColor = theme === "dark" ? "#292929" : Colors.light.card;
  const txtColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const errBck =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleSubmit = () => {
    const { firstname, lastname, password, email } = data;
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !password.trim() ||
      !email.trim()
    ) {
      setError("Please fill all input fields");
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    axios
      .post(`http://${IP}/signup`, data)
      .then(async (res) => {
        if (res.data.Status === "Success") {
          await storeData("userDetails", {
            name: `${data.firstname} ${data.lastname}`,
            email,
            id: res.data.id,
          });
          navigation.replace("Login");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => {
        setError("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
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
        <ScrollView
          style={[
            styles.loginCont,
            {
              backgroundColor:
                theme === "dark" ? Colors.dark.bar : Colors.light.card,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontFamily: "MonBold",
              fontSize: 18,
              textAlign: "center",
              color: txtColor,
              marginBottom: 20,
            }}
          >
            Create an account
          </Text>
          <View>
            <Text
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                },
                styles.label,
              ]}
            >
              Firstname
            </Text>
            <TextInput
              selectionColor={
                theme === "dark" ? Colors.dark.text : Colors.light.text
              }
              placeholder="Enter firstname"
              placeholderTextColor={
                theme === "dark" ? "#cccccc33" : "#00000033"
              }
              onChangeText={(text) => setData({ ...data, firstname: text })}
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                  backgroundColor,
                },
                styles.txtInput,
              ]}
            />
          </View>
          <View>
            <Text
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                },
                styles.label,
              ]}
            >
              Lastname
            </Text>
            <TextInput
              selectionColor={
                theme === "dark" ? Colors.dark.text : Colors.light.text
              }
              placeholder="Enter Lastname"
              placeholderTextColor={
                theme === "dark" ? "#cccccc33" : "#00000033"
              }
              onChangeText={(text) => setData({ ...data, lastname: text })}
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                  backgroundColor,
                },
                styles.txtInput,
              ]}
            />
          </View>
          <View>
            <Text
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                },
                styles.label,
              ]}
            >
              Email
            </Text>
            <TextInput
              selectionColor={
                theme === "dark" ? Colors.dark.text : Colors.light.text
              }
              placeholder="Enter Email"
              placeholderTextColor={
                theme === "dark" ? "#cccccc33" : "#00000033"
              }
              onChangeText={(text) => setData({ ...data, email: text })}
              keyboardType="email-address"
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                  backgroundColor,
                },
                styles.txtInput,
              ]}
            />
          </View>
          <View>
            <Text
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                },
                styles.label,
              ]}
            >
              Pin (4-digit)
            </Text>
            <TextInput
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={true}
              selectionColor={
                theme === "dark" ? Colors.dark.text : Colors.light.text
              }
              placeholder="Enter Pin"
              placeholderTextColor={
                theme === "dark" ? "#cccccc33" : "#00000033"
              }
              onChangeText={(text) => setData({ ...data, password: text })}
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                  backgroundColor,
                },
                styles.txtInput,
              ]}
            />
          </View>
          <View>
            <Text
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                },
                styles.label,
              ]}
            >
              Confirm Pin
            </Text>
            <TextInput
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={true}
              selectionColor={
                theme === "dark" ? Colors.dark.text : Colors.light.text
              }
              placeholder="Confirm Pin"
              placeholderTextColor={
                theme === "dark" ? "#cccccc33" : "#00000033"
              }
              onChangeText={(text) => setData({ ...data, password: text })}
              style={[
                {
                  color:
                    theme === "dark" ? Colors.dark.text : Colors.light.text,
                  backgroundColor,
                },
                styles.txtInput,
              ]}
            />
          </View>
          <Pressable
            onPress={handleSubmit}
            style={{
              backgroundColor: "#023E8A",
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
              marginHorizontal: 15,
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
              Create account
            </Text>
          </Pressable>
        </ScrollView>
        <View
          style={{
            marginTop: 20,
            position: "absolute",
            bottom: "5%",
            flexDirection: "row",
            alignItems: "center",
            zIndex: -1,
          }}
        >
          <Text
            style={{
              color: "gray",
            }}
          >
            You have an account?{" "}
          </Text>
          <Pressable onPress={() => navigation.push("Login")}>
            <Text
              style={{
                color: "#023E8A",
                fontFamily: "MonBold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  loginCont: {
    width: "100%",
    position: "absolute",
    backgroundColor: Colors.dark.card,
    flex: 1,
    top: 0,
    transform: [{ translateY: -50 }],
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
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

  label: {
    fontFamily: "MonBold",
    marginBottom: 5,
    marginLeft: 18,
    opacity: 0.7,
  },
});
