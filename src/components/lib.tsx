/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ImSpinner2 } from "react-icons/im";
import { useCurrency } from "../hooks/useCurrency";
import {
  backgroundColor,
  bodyColor,
  hoverColor,
  negativeColor,
  positiveColor,
  secondaryColor,
} from "../styles/colors";
import { headerHeight, pageHeight, pageWidth } from "../styles/sizes";
import { formatCurrency, formatPercentage } from "../utils/numberFormat";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(ImSpinner2)({
  animation: `${spin} 1s linear infinite`,
  color: bodyColor,
  height: `calc(${headerHeight} / 2)`,
  width: `calc(${headerHeight} / 2)`,
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

const Button = styled.button`
  padding: 5px;
  width: 60px;
  background: transparent;
  border: none;
  border-radius: 5px;
  color: ${secondaryColor};
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Rubik', sans-serif;
  &:hover {
    background: ${hoverColor};
  }
`;

const CoinLogo = styled.img({
  maxWidth: "26px",
  maxHeight: "26px",
  margin: "0 auto",
  borderRadius: "100%",
  background: bodyColor,
  padding: "2px",
});

const PAlignRight = styled.p({
  textAlign: "right",
});
interface PTextProps {
  value: string | number;
}

function CurrencyText({ value }: PTextProps) {
  const [fiat] = useCurrency();
  return <PAlignRight>{formatCurrency(value, fiat)}</PAlignRight>;
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
    <PAlignRight
      css={
        Number(value) > 0
          ? percentageTextVariant["positive"]
          : percentageTextVariant["negative"]
      }
    >
      {formatPercentage(value)}
    </PAlignRight>
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
        }}
      >
        <p>Something went wrong. Retrying...</p>
      </div>
    </CenteredPageContainer>
  );
}

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  margin: ${headerHeight} 0 0 0;
  & > thead {
    text-align: left;
  }
  td,
  th {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  td:first-child,
  th:first-child {
    padding-left: 10px;
    padding-right: 0;
  }
  td:nth-child(4),
  th:nth-child(4),
  td:last-child,
  th:last-child {
    padding-right: 10px;
  }
`;

export {
  Button,
  CoinLogo,
  CurrencyText,
  PageContainer,
  PageLoader,
  PAlignRight,
  PercentageText,
  PageErrorFallback,
  Table,
};
