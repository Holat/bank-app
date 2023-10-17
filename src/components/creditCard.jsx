import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const CreditCard = () => {
  return (
    <ImageBackground
      source={require("../../assets/47.jpg")}
      style={styles.cont}
    >
      <View>
        <Text style={styles.header}>Dream Bank</Text>
      </View>
      <Image
        source={require("../../assets/chip.png")}
        style={styles.chip}
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View>
          <Text style={{ fontFamily: "Teko", fontSize: 25 }}>
            2221 0012 3412 3456
          </Text>
          <View>
            <Text style={{ fontSize: 8, fontFamily: "RobotoRegular" }}>
              VALID THRU
            </Text>
            <Text style={{ fontFamily: "RobotoRegular", fontSize: 16 }}>
              12/23
            </Text>
          </View>
          <Text style={{ fontFamily: "RobotoBold", fontSize: 16 }}>
            Alex Walter
          </Text>
        </View>
        <Image
          source={require("../../assets/mastercardlogo.png")}
          style={{ width: 60, height: 60, alignSelf: "flex-end" }}
          resizeMode="cover"
        />
      </View>
    </ImageBackground>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  cont: {
    borderRadius: 10,
    padding: 15,
    overflow: "hidden",
  },

  header: {
    fontSize: 18,
    fontWeight: "400",
  },

  chip: {
    width: 60,
    height: 45,
    marginTop: 30,
    marginLeft: 15,
    borderColor: "#9D8A00",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#EDBE00",
  },
});
