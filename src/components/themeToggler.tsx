/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import { IconButton } from "./lib";

function ThemeToggler() {
  const themeContextValue = useTheme();
  const [theme, setTheme] = React.useState(themeContextValue);
  const nextTheme = theme === "light" ? "dark" : "light";

  React.useEffect(() => {
    document.body.dataset.theme = theme;
    chrome.storage.sync.set({ theme });
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <IconButton
      css={{
        color: "var(--color-body)",
      }}
      onClick={() => setTheme(nextTheme)}
    >
      {theme === "light" ? <FiSun /> : <FiMoon />}
    </IconButton>
  );
}

export default ThemeToggler;
