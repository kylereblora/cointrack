/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import Switch from "react-switch";
import { useFetchCurrencies } from "./hooks/useFetchCurrencies";
import CryptoTable from "./components/Table";
import { PageContainer, PageErrorFallback, PageLoader } from "./components/lib";
import {
  backgroundColor,
  bodyColor,
  scrollbarThumbColor,
} from "./styles/colors";
import { useCurrency } from "./hooks/useCurrency";

const App = () => {
  const [fiat, setFiat] = useCurrency();
  const { data, error, isValidating } = useFetchCurrencies({
    convert: fiat,
  });

  function handleSetFiat() {
    if (fiat === "PHP") setFiat("USD");
    else setFiat("PHP");
  }

  if (error) {
    return <PageErrorFallback error={error} />;
  }

  return (
    <PageContainer
      css={css`
        color: ${bodyColor};
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: 0.2em;
          height: 0.2em;
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
          display: "flex",
          justifyContent: "space-between",
          top: 0,
        }}
      >
        <h1>CoinTrack</h1>
        <button onClick={handleSetFiat} disabled={isValidating}>
          {fiat}
        </button>
      </div>
      {data ? <CryptoTable data={data} /> : <PageLoader />}
    </PageContainer>
  );
};

export default App;
