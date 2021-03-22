import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import { CurrencyProvider } from "./context/currencyContext";
import { ThemeProvider } from "./context/themeContext";
import "./popup.scss";
import "./styles/theme.scss";

var mountNode = document.getElementById("popup");
chrome.storage.sync.get(["fiat", "theme"], (result) => {
  ReactDOM.render(
    <CurrencyProvider {...result}>
      <ThemeProvider {...result}>
        <App />
      </ThemeProvider>
    </CurrencyProvider>,
    mountNode
  );
});
