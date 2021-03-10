/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ImSpinner2 } from "react-icons/im";
import { useCurrency } from "../hooks/useCurrency";
import {
  backgroundColor,
  bodyColor,
  negativeColor,
  positiveColor,
  secondaryColor,
} from "../styles/colors";
import {
  headerHeight,
  pageHeight,
  pageWidth,
} from "../styles/sizes";
import { formatCurrency, formatPercentage } from "../utils/numberFormat";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(ImSpinner2)({
  animation: `${spin} 1s linear infinite`,
  color: bodyColor,
  height: "35px",
  width: "35px",
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

const CoinLogo = styled.img({
  maxWidth: "26px",
  maxHeight: "26px",
  margin: "0 auto",
  borderRadius: "100%",
  background: bodyColor,
  padding: "2px",
});

const P = styled.p({
  color: bodyColor,
  textAlign: "right",
});

interface PTextProps {
  value: string | number;
}

function CurrencyText({ value }: PTextProps) {
  const [fiat] = useCurrency();
  return <P>{formatCurrency(value, fiat)}</P>;
}

const percentageTextVariant = {
  positive: {
    color: positiveColor,
  },
  negative: {
    color: negativeColor,
  },
};

function PercentageText({ value }: PTextProps) {
  return (
    <P
      css={
        Number(value) > 0
          ? percentageTextVariant["positive"]
          : percentageTextVariant["negative"]
      }
    >
      {formatPercentage(value)}
    </P>
  );
}

const PageContainer = styled.div({
  backgroundColor: backgroundColor,
  color: bodyColor,
  height: pageHeight,
  width: pageWidth,
});

const CenteredPageContainer = styled(PageContainer)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function PageLoader() {
  return (
    <CenteredPageContainer>
      <Spinner />
    </CenteredPageContainer>
  );
}

interface PageErrorFallbackProps {
  error: string;
}

function PageErrorFallback() {
  return (
    <CenteredPageContainer
      css={{
        flexDirection: "column",
      }}
    >
      <h2>Encountered an error:</h2>
      <div
        css={{
          padding: "10px",
          backgroundColor: negativeColor,
        }}
      >
        <p>Something went wrong.</p>
      </div>
    </CenteredPageContainer>
  );
}

const Table = styled.table`
  margin: ${headerHeight} auto auto auto;
  min-width: 255px;
  border-spacing: 0;
  & > thead {
    text-align: left;
  }
`;

export {
  CoinLogo,
  CurrencyText,
  P,
  PercentageText,
  PageContainer,
  PageLoader,
  PageErrorFallback,
  Table,
};
