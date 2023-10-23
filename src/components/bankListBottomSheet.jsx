import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import Animated, { ZoomIn, ZoomOut, Layout } from "react-native-reanimated";

import { Colors } from "../constants/Theme";
import { useBankList } from "../hooks";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BankListBottomSheet = ({ bottomSheetRef, theme, setData }) => {
  const { searchList, handleSearch, setSearch } = useBankList();
  const snapPoints = useMemo(() => ["50%", "95%"], []);

  const handlePress = (name, code) => {
    setData((prev) => ({
      ...prev,
      bankName: name,
      bankCode: code,
    }));
    setSearch("");
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={{
        backgroundColor: theme === "dark" ? Colors.dark.card : "#f1f5f9",
      }}
    >
      <Text
        style={[
          { color: theme === "dark" ? Colors.dark.text : Colors.light.text },
          styles.headerTxt,
        ]}
      >
        Banks List
      </Text>
      <TextInput
        placeholder="Search"
        placeholderTextColor={"#1c1c1c"}
        onChangeText={(text) => handleSearch(text)}
        style={[
          {
            color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            backgroundColor: theme === "dark" ? "#292929" : "white",
          },
          styles.txtInput,
        ]}
      />
      <AnimatedFlatlist
        data={searchList}
        keyExtractor={(item) => item.code}
        renderItem={({ item, index }) => (
          <AnimatedPressable
            onPress={() => handlePress(item.name, item.code)}
            entering={ZoomIn.delay(100 * index)}
            exiting={ZoomOut}
            layout={Layout}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={[{ backgroundColor: "white" }, styles.cardCont]}>
              <Image
                source={{ uri: item.logo }}
                resizeMode="cover"
                style={{
                  width: 30,
                  aspectRatio: 1,
                  borderRadius: 2,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: "MonBold",
                color: theme === "dark" ? Colors.dark.text : Colors.light.text,
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
          </AnimatedPressable>
        )}
        contentContainerStyle={{
          gap: 20,
          padding: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      />
    </BottomSheetModal>
  );
};

export default BankListBottomSheet;

const styles = StyleSheet.create({
  headerTxt: {
    marginLeft: 20,
    fontFamily: "MonBold",
    fontSize: 15,
  },
  txtInput: {
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  cardCont: {
    borderRadius: 10,
    width: 45,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
