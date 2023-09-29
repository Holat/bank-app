import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BuildingLibraryIcon } from "react-native-heroicons/solid";
import { Trans } from "./trans";

const Card = ({ item }) => {
  return (
    <View style={styles.cont}>
      <View style={styles.icon}>
        <BuildingLibraryIcon color={"white"} size={25} />
      </View>
      <View style={styles.cardCont}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.boldTxt}>{item.name}</Text>
          <Text
            style={[
              styles.boldTxt,
              { color: item.debitOrCredit === "credit" ? "green" : "red" },
            ]}
          >
            {item.debitOrCredit === "debit" ? "-" : "+"}${item.amount}
          </Text>
        </View>
        <View style={{ color: "gray" }}>
          <Text>{item.time}</Text>
        </View>
      </View>
    </View>
  );
};

const Transactions = () => {
  return (
    <View style={{ flex: 2 }}>
      <Text style={styles.header}>Transactions</Text>
      <ScrollView
        contentContainerStyle={{
          gap: 5,
          paddingBottom: 10,
          borderRadius: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        {Trans.map((item, i) => (
          <Card item={item} key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  icon: {
    backgroundColor: "#001c55",
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cardCont: {
    alignItems: "flex-start",
    flex: 1,
  },
  boldTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
