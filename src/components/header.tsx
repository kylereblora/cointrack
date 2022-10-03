/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import FiatDropdown from "./FiatDropdown";
import ThemeToggler from "./themeToggler";

function Header() {
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        padding: "10px",
        backgroundColor: "var(--color-background)",
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
          <p css={{
            fontSize: 'x-small'
          }}>Powered by CoinGecko</p>
        </div>
        <div
          css={{
            display: "flex",
          }}
        >
          <FiatDropdown />
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}

export default Header;
