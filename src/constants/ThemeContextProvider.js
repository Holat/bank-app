import { StatusBar } from "expo-status-bar";
import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("dark");
  const [showBalance, setShowBalance] = useState(true);

  const contextValue = { theme, setTheme, showBalance, setShowBalance };
  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
