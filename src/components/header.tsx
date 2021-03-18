/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { backgroundColor } from "../styles/colors";
import FiatDropdown from "./fiatDropdown";

function Header() {
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        padding: "10px",
        backgroundColor: backgroundColor,
        width: "100%",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            css={{
              fontWeight: "normal",
            }}
          >
            CoinTrack
          </h1>
        </div>
        <FiatDropdown />
      </div>
    </div>
  );
}

export default Header;
