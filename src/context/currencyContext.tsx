import * as React from "react";

const CurrencyContext = React.createContext<[any, any]>([null, null]);

function CurrencyProvider(props: any) {
  const [fiat, setFiat] = React.useState("PHP");
  return <CurrencyContext.Provider value={[fiat, setFiat]} {...props} />;
}

export { CurrencyContext, CurrencyProvider };
