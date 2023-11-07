import { StatusBar } from "expo-status-bar";
import React, { useState, createContext, useEffect } from "react";
import { View } from "react-native";

import { getData } from "../utils/asyncStorage";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("dark");
  const [showBalance, setShowBalance] = useState(true);
  const [name, setName] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("userDetails");
      const { email, id, name } = data;
      if (name) {
        setName(name);
        setId(id);
      } else {
        setName("");
        setId(null);
      }
    };

    fetchData();
  }, []);

  const contextValue = {
    theme,
    setTheme,
    showBalance,
    setShowBalance,
    name,
    id,
  };
  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <View style={{ flex: 1 }}>{props.children}</View>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
