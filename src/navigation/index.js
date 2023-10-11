import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  WelcomeScreen,
  SendScreen,
  PayScreen,
  Settings,
  CardScreen,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BanknotesIcon,
  CreditCardIcon,
  HomeIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "react-native-heroicons/outline";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveBackgroundColor: "black",
        tabBarActiveBackgroundColor: "black",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <HomeIcon color={"white"} /> }}
      />
      <Tab.Screen
        name="Send"
        component={SendScreen}
        options={{ tabBarIcon: () => <PaperAirplaneIcon color={"white"} /> }}
      />
      <Tab.Screen
        name="Pay"
        component={PayScreen}
        options={{ tabBarIcon: () => <BanknotesIcon color={"white"} /> }}
      />
      <Tab.Screen
        name="Cards"
        component={CardScreen}
        options={{ tabBarIcon: () => <CreditCardIcon color={"white"} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{ tabBarIcon: () => <UserIcon color={"white"} /> }}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Welcome"
      >
        <Stack.Screen
          name="Tab"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
