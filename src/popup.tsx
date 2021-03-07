import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import "./popup.scss";

var mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
