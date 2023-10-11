import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("dark");

  const contextValue = { theme, setTheme };
  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
