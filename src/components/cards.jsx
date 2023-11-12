import { StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { Accounts } from "../constants";
import { useSharedValue } from "react-native-reanimated";
import Circle from "./circle";
import Card from "./card";
import { ThemeContext } from "../constants/ThemeContextProvider";

const Cards = () => {
  const { userDetails } = useContext(ThemeContext);
  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);
  const { savings, current, other } = userDetails;

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
          const balance = i === 0 ? other : i === 1 ? savings : current;
          return (
            <Card
              index={i}
              acct={acct}
              key={acct.id}
              priority={priority}
              firstPriority={firstPriority}
              secondPriority={secondPriority}
              thirdPriority={thirdPriority}
              balance={balance}
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
    marginBottom: 20,
    marginTop: 30,
    gap: 10,
    paddingHorizontal: 15,
    height: 180,
  },
});
