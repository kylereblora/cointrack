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

const App = () => {
  const { data, error } = useFetchCurrencies();

  if (error) return <PageErrorFallback error={error} />;
  if (!data) {
    return <PageLoader />;
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
      <h1>CoinTrack</h1>
      <CryptoTable data={data} />
    </PageContainer>
  );
};

export default App;
