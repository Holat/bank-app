import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  BuildingLibraryIcon,
  RectangleStackIcon,
} from "react-native-heroicons/solid";
import axios from "axios";

import { ThemeContext } from "../constants/ThemeContextProvider";
import { Colors } from "../constants/Theme";
import { getTime, priceToCurrency } from "../utils";
import { IP } from "@env";

const Card = ({ item }) => {
  const { theme } = useContext(ThemeContext);

  const txtColor = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <View style={[styles.cont, { backgroundColor }]}>
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
          <Text style={[styles.boldTxt, { color: txtColor }]}>
            {item.recipient}
          </Text>
          <Text
            style={[
              styles.boldTxt,
              {
                color:
                  item.transtype?.toLowerCase() == "credit"
                    ? "green"
                    : item.transtype?.toLowerCase() == "debit" &&
                      theme === "light"
                    ? "black"
                    : "white",
                opacity: 0.7,
              },
            ]}
          >
            {item.transtype?.toLowerCase() == "debit" ? "-" : "+"}
            {priceToCurrency(item.amount?.toString())}
          </Text>
        </View>
        <View>
          <Text
            style={[
              {
                fontFamily: "RobotoRegular",
                opacity: 0.5,
                fontSize: 12,
                color: txtColor,
              },
            ]}
          >
            {getTime(item.time)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Transactions = () => {
  const { theme, userDetails } = useContext(ThemeContext);
  const [trans, setTrans] = useState([""]);

  const txtColor = theme === "dark" ? Colors.dark.text : Colors.light.text;

  useEffect(() => {
    axios
      .get(`http://${IP}/transaction/${userDetails.id}`)
      .then((res) => {
        setTrans(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{ flex: 2 }}>
      <Text style={[styles.header, { color: txtColor }]}>Transactions</Text>
      {trans.length === 0 ? (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RectangleStackIcon
            color={theme === "dark" ? "#2f2f2f" : "#cccccc"}
            size={120}
          />
          <Text
            style={{
              color: theme === "dark" ? "#2f2f2f" : "#cccccc",
              fontFamily: "RobotoBold",
              fontSize: 20,
              marginBottom: 50,
            }}
          >
            No transaction
          </Text>
        </View>
      ) : (
        <ScrollView
          overScrollMode="never"
          contentContainerStyle={{
            borderRadius: 10,
            backgroundColor:
              theme === "dark" ? Colors.dark.card : Colors.light.card,
            gap: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {trans.map((item, i) => (
            <Card item={item} key={i} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  cont: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.8,
    paddingLeft: 20,
    fontFamily: "MonBold",
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
    fontSize: 15,
    fontFamily: "MonBold",
  },
});
