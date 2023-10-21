import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Accounts } from "../constants";
import { useSharedValue } from "react-native-reanimated";
import Circle from "./circle";
import Card from "./card";

const Cards = () => {
  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);
  return (
    <View style={styles.cont}>
      <View
        style={{
          position: "relative",
          flex: 1,
          alignItems: "center",
          alignSelf: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {Accounts.map((acct, i) => {
          const priority =
            i === 0 ? thirdPriority : i === 1 ? secondPriority : firstPriority;
          return (
            <Card
              index={i}
              acct={acct}
              key={acct.id}
              priority={priority}
              firstPriority={firstPriority}
              secondPriority={secondPriority}
              thirdPriority={thirdPriority}
            />
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 10,
          paddingTop: 5,
        }}
      >
        {Accounts.map(({ id }, i) => {
          const priority =
            i === 2 ? thirdPriority : i === 1 ? secondPriority : firstPriority;
          return (
            <Circle
              key={id}
              priority={priority}
              firstPriority={firstPriority}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cont: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    paddingTop: 45,
    marginBottom: 20,
    gap: 10,
    paddingHorizontal: 15,
    // backgroundColor: "green",
  },
});
