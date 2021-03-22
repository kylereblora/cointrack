/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { useFetchCurrencies } from "./hooks/useFetchCurrencies";
import CryptoTable from "./components/table";
import { PageContainer, PageErrorFallback, PageLoader } from "./components/lib";
import { useCurrency } from "./hooks/useCurrency";
import { scrollbarHeight, scrollbarWidth } from "./styles/sizes";
import Header from "./components/header";

const App = () => {
  const [fiat] = useCurrency();
  const { data, error } = useFetchCurrencies({
    convert: fiat,
  });

  return (
    <PageContainer
      css={css`
        color: var(--color-body);
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: ${scrollbarWidth};
          height: ${scrollbarHeight};
        }
        &::-webkit-scrollbar-thumb {
          background: var(--color-scrollbar-thumb);
        }
        &::-webkit-scrollbar-track {
          background: var(--color-background);
        }
        & {
          scrollbar-face-color: var(--color-scrollbar-thumb);
          scrollbar-track-color: var(--color-background);
        }
      `}
    >
      <Header />
      {data ? (
        <CryptoTable data={data} />
      ) : error ? (
        <PageErrorFallback />
      ) : (
        <PageLoader />
      )}
    </PageContainer>
  );
};

export default App;
