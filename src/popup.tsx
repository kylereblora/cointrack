import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import { CurrencyProvider } from "./context/currencyContext";
import "./popup.scss";

var mountNode = document.getElementById("popup");
ReactDOM.render(
  <CurrencyProvider>
    <App />
  </CurrencyProvider>,
  mountNode
);
