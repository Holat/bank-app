import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Card, Transactions } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/solid";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.cont, { paddingTop: top }]}>
      <View
        style={[
          styles.flex,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 15,
          },
        ]}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Hello Alex👋</Text>
          <Text>your financial dreamland</Text>
        </View>
        <UserCircleIcon color={"#001c55"} size={50} />
      </View>
      <Card />
      <Transactions />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },

  flex: {
    display: "flex",
    alignItems: "center",
  },
});
