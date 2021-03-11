/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { useFetchCurrencies } from "./hooks/useFetchCurrencies";
import CryptoTable from "./components/Table";
import { PageContainer, PageErrorFallback, PageLoader } from "./components/lib";
import {
  backgroundColor,
  bodyColor,
  scrollbarThumbColor,
} from "./styles/colors";
import { useCurrency } from "./hooks/useCurrency";
import { scrollbarHeight, scrollbarWidth } from "./styles/sizes";
import FiatDropdown from "./components/FiatDropdown";

const App = () => {
  const [fiat] = useCurrency();
  const { data, error } = useFetchCurrencies({
    convert: fiat,
  });

  return (
    <PageContainer
      css={css`
        color: ${bodyColor};
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: ${scrollbarWidth};
          height: ${scrollbarHeight};
        }
        &::-webkit-scrollbar-thumb {
          background: ${scrollbarThumbColor};
        }
        &::-webkit-scrollbar-track {
          background: ${backgroundColor};
        }
        & {
          scrollbar-face-color: ${scrollbarThumbColor};
          scrollbar-track-color: ${backgroundColor};
        }
      `}
    >
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
            <h1>CoinTrack</h1>
            <p>API by Nomics</p>
          </div>
          <FiatDropdown />
        </div>
      </div>
      {data ? <CryptoTable data={data} /> : error ? <PageErrorFallback /> : <PageLoader />}
    </PageContainer>
  );
};

export default App;
