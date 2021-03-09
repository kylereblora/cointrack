import * as React from 'react';
import { CurrencyContext } from '../context/currencyContext';

export function useCurrency() {
  const context = React.useContext(CurrencyContext);

  if (!context) {
    throw new Error(`useCurrency must be used inside a CurrencyContext.Provider`)
  }

  return context;
}
