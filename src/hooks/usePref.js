import React, { useState, useEffect } from "react";
import { getPref } from "../utils/asyncStorage";

const usePref = () => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const fetchThemePreference = async () => {
      const userTheme = await getPref("theme");
      if (userTheme) {
        setTheme(userTheme);
      }
    };

    fetchThemePreference();
  }, []);

  return theme;
};

export default usePref;
