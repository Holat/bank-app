import { StatusBar } from "expo-status-bar";
import React, { useState, createContext, useEffect } from "react";
import { View } from "react-native";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children, themePref }) => {
  const [theme, setTheme] = useState(themePref || "dark");
  const [showBalance, setShowBalance] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "",
    id: null,
    email: "",
  });

  const contextValue = {
    theme,
    setTheme,
    showBalance,
    setShowBalance,
    userDetails,
    setUserDetails,
  };

  useEffect(() => {}, []);
  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <View style={{ flex: 1 }}>{children}</View>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
