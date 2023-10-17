import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CreditCard = () => {
  return (
    <View style={styles.cont}>
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
        <Text>22 22 2 2 2 2 2 2 2</Text>
        <View>
          <Text></Text>
          <Text></Text>
        </View>
        <Text></Text>
        <Image
          source={require("../../assets/mastercardlogo.png")}
          style={{ width: 60, height: 60, alignSelf: "flex-end" }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "white",
    // height: 200,
    borderRadius: 10,
    padding: 15,
  },

  header: {
    fontSize: 18,
    fontWeight: "400",
  },

  chip: {
    width: 60,
    height: 40,
    marginTop: 30,
  },
});
