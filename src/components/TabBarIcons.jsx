import { StyleSheet } from "react-native";
import React from "react";
import {
  HomeIcon,
  CreditCardIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
  BanknotesIcon,
} from "react-native-heroicons/solid";
import Animated from "react-native-reanimated";

const HomeIconA = Animated.createAnimatedComponent(<HomeIcon />);
const TabBarIcon = ({ i, rStyle, color }) => {
  switch (i) {
    case 0:
      return (
        <Animated.View style={rStyle}>
          <HomeIcon color={color} />
        </Animated.View>
      );
    case 1:
      return (
        <Animated.View style={rStyle}>
          <PaperAirplaneIcon color={color} />
        </Animated.View>
      );
    case 2:
      return (
        <Animated.View style={rStyle}>
          <BanknotesIcon color={color} />
        </Animated.View>
      );
    case 3:
      return (
        <Animated.View style={rStyle}>
          <CreditCardIcon color={color} />
        </Animated.View>
      );
    case 4:
      return (
        <Animated.View style={rStyle}>
          <UserCircleIcon
            color={"#023E8A"}
            style={{
              backgroundColor: "white",
              borderRadius: 50,
            }}
          />
        </Animated.View>
      );
    default:
      return <HomeIcon color={color} />;
  }
};

export default TabBarIcon;

const styles = StyleSheet.create({});
