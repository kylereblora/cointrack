import * as React from "react";

type CurrencyContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

type CurrencyProviderProps = {
  children: React.ReactNode;
  fiat?: string;
};

const CurrencyContext = React.createContext<CurrencyContextType>([
  null!,
  null!,
]);

function CurrencyProvider(props: CurrencyProviderProps) {
  const [fiat, setFiat] = React.useState(props.fiat || "USD");

  React.useEffect(() => {
    chrome.storage.sync.set({ fiat });
  }, [fiat]);

  return <CurrencyContext.Provider value={[fiat, setFiat]} {...props} />;
}

export { CurrencyContext, CurrencyProvider };
