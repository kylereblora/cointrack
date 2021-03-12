import * as React from "react";

const CurrencyContext = React.createContext<[any, any]>([null, null]);

function CurrencyProvider(props: any) {
  const [fiat, setFiat] = React.useState(props.fiat || "PHP");

  React.useEffect(() => {
    chrome.storage.sync.set({ fiat });
  }, [fiat]);

  return <CurrencyContext.Provider value={[fiat, setFiat]} {...props} />;
}

export { CurrencyContext, CurrencyProvider };
