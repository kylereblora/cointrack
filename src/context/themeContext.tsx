import * as React from "react";

type ThemeContextType = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: ThemeContextType;
};

const ThemeContext = React.createContext<ThemeContextType>("dark");

function ThemeProvider(props: ThemeProviderProps) {
  return <ThemeContext.Provider value={props.theme || "dark"} {...props} />;
}

export { ThemeProvider, ThemeContext, ThemeContextType };
