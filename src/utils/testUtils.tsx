import * as React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CurrencyProvider } from "../context/currencyContext";
import { ThemeProvider } from "../context/themeContext";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { SWRConfig } from "swr";

type WrapperProps = {
  children: React.ReactNode;
};

// solves the issue raised in https://github.com/emotion-js/emotion/issues/1105
const emotionCache = createCache({ key: "emotion-test-util-key" });
emotionCache.compat = true;

function Wrapper({ children }: WrapperProps): React.ReactElement {
  // since we're using useSWR, it's caching does not play out well when testing the app in isolation
  // and might bleed out to other tests. To fix this, we'll render SWRConfig with dedupingInterval: 0
  // in the wrapper and add cache.clear() to setupTest.ts
  return (
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <CacheProvider value={emotionCache}>
        <CurrencyProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </CurrencyProvider>
      </CacheProvider>
    </SWRConfig>
  );
}

// custom render util with a custom wrapper
function render(ui: React.ReactElement, options?: RenderOptions) {
  return rtlRender(ui, { wrapper: Wrapper as React.ComponentType, ...options });
}

export * from "@testing-library/react";

export { render, userEvent };
