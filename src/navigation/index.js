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
import { CustomTabBar } from "../components";
import { View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <View
      style={{
        width,
        height,
      }}
    >
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Send" component={SendScreen} />
        <Tab.Screen name="Pay" component={PayScreen} />
        <Tab.Screen name="Cards" component={CardScreen} />
        <Tab.Screen name="Profile" component={Settings} />
      </Tab.Navigator>
    </View>
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
