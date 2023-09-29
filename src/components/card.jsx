import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BanknotesIcon, WalletIcon } from "react-native-heroicons/outline";
import Accounts from "../constants";

const Card = () => {
  return (
    <View style={styles.cont}>
      {Accounts.map((acct, i) => {
        return (
          <View
            style={[
              styles.card,
              {
                top: i * 20,
                opacity: (i + 0.4) / 2,
                backgroundColor: acct.color,
                width: `${80 + i * 10}%`,
              },
            ]}
          >
            <Text style={styles.cardTxt1}>{acct.name} Account</Text>
            <View>
              <Text style={styles.cardTxt1}>Balance: </Text>
              <Text style={styles.cardTxt2}>${acct.balance}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cont: {
    paddingVertical: 20,
    position: "relative",
    alignItems: "center",
    paddingHorizontal: 10,
    flex: 1,
    marginVertical: 10,
  },

  card: {
    backgroundColor: "#001c55",
    height: 180,
    width: "100%",
    borderRadius: 10,
    padding: 20,
    position: "absolute",
    overflow: "hidden",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
    shadowOpacity: 0.25,

    // elevation: 10,
  },

  cardTxt1: {
    color: "white",
    fontWeight: "500",
  },

  cardTxt2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },

  backG: {
    position: "absolute",
    top: -10,
    right: -20,
    transform: [{ rotate: "-45deg" }],
    zIndex: -1,
  },
});
