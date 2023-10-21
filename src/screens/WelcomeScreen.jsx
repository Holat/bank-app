import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { BuildingLibraryIcon } from "react-native-heroicons/outline";
import Animated, { FadeInDown } from "react-native-reanimated";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Tab");
    }, 1000);
  }, []);

  return (
    <View style={[styles.cont, styles.flex]}>
      <View style={[styles.logoCont, styles.flex]}>
        <View style={[styles.logo, styles.flex]}>
          <BuildingLibraryIcon color={"#0077b6"} size={75} />
        </View>
        <View style={[styles.flex, { flexDirection: "row" }]}>
          <Animated.Text
            entering={FadeInDown.duration(500).springify()}
            style={styles.logoTxt}
          >
            Dream
          </Animated.Text>
          <Animated.Text
            style={styles.logoTxt}
            entering={FadeInDown.springify(400).delay(100)}
          >
            {" "}
            Bank
          </Animated.Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "#023e8a",
    flex: 1,
  },

  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    backgroundColor: "white",
    borderColor: "#001c55",
    borderWidth: 10,
    borderRadius: 150,
    width: 176,
    aspectRatio: 1,
  },

  logoTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 10,
  },
});
