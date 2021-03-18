import * as React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { CurrencyProvider } from "../context/currencyContext";

type WrapperProps = {
  children: React.ReactNode;
};

function Wrapper({ children }: WrapperProps): React.ReactElement {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}

// custom render util with a custom wrapper
function render(ui: React.ReactElement, options?: RenderOptions) {
  return rtlRender(ui, { wrapper: Wrapper as React.ComponentType, ...options });
}

export * from "@testing-library/react";

export { render };
