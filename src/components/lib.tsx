/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ImSpinner2 } from "react-icons/im";
import {
  backgroundColor,
  bodyColor,
  negativeColor,
  positiveColor,
} from "../styles/colors";
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
});

const P = styled.p({
  color: bodyColor,
  textAlign: "right",
});

interface PTextProps {
  value: string | number;
}

function CurrencyText({ value }: PTextProps) {
  return <P>{formatCurrency(value)}</P>;
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
  height: "300px",
  width: "300px",
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

function PageErrorFallback({ error }: PageErrorFallbackProps) {
  return (
    <CenteredPageContainer>
      <h2>Encountered an error:</h2>
      <div
        css={{
          padding: "10px",
          backgroundColor: negativeColor,
        }}
      >
        {error}
      </div>
    </CenteredPageContainer>
  );
}

const Table = styled.table`
  margin: auto;
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
