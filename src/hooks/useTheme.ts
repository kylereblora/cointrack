import * as React from "react";
import { ThemeContext } from "../context/themeContext";

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(`useTheme must be used inside a ThemeContext.Provider`);
  }

  return context;
}
