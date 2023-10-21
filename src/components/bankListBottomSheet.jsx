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
import useBankList from "../hooks/useBankList";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BankListBottomSheet = ({ bottomSheetRef, theme, setData }) => {
  const { searchList, handleSearch } = useBankList();
  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const handlePress = (name, code) => {
    setData((prev) => ({
      ...prev,
      bankName: name,
      bankCode: code,
    }));
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={{
        backgroundColor:
          theme === "dark" ? Colors.dark.card : Colors.light.card,
      }}
    >
      <Text
        style={{
          color: "white",
          marginLeft: 20,
          fontFamily: "MonBold",
          fontSize: 15,
        }}
      >
        Banks List
      </Text>
      <TextInput
        placeholder="Search"
        placeholderTextColor={"white"}
        onChangeText={(text) => handleSearch(text)}
        style={{
          backgroundColor: "#3c3c3c",
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 10,
          marginVertical: 10,
        }}
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
            <View
              style={{
                backgroundColor: "#cccccc",
                borderRadius: 10,
                width: 45,
                aspectRatio: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                color: "white",
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

const styles = StyleSheet.create({});
