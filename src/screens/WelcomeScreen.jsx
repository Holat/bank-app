import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Tab");
    }, 1000);
  }, []);

  return (
    <View style={[styles.cont, styles.flex]}>
      <View style={[styles.logoCont, styles.flex]}>
        <Animated.View
          style={[styles.logo, styles.flex]}
          entering={FadeIn.delay(200)}
        >
          <Image
            source={require("../../assets/tree.png")}
            style={{
              width: 200,
              height: 200,
            }}
            resizeMode="cover"
          />
        </Animated.View>
        <View style={[styles.flex, { flexDirection: "row" }]}>
          <Animated.Text
            entering={FadeInDown.duration(500).springify()}
            style={styles.logoTxt}
          >
            Dream
          </Animated.Text>
          <Animated.Text
            style={styles.logoTxt}
            entering={FadeInDown.duration(500).delay(100).springify()}
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
    backgroundColor: "white",
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
    color: "#001c55",
    textAlign: "center",
    fontSize: 45,
    marginTop: 10,
    fontFamily: "Agbalumo",
  },
});
