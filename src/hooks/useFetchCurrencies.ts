import useSWR, { ConfigInterface } from "swr";
import { fetcher } from "../utils/fetcher";

interface FetchCurrenciesConfig {
  interval?: string;
  currency?: string;
  status?: string;
  perPage?: number;
  page?: number;
}

const defaultConfig: FetchCurrenciesConfig = {
  interval: "1d",
  currency: "USD",
  status: "active",
  perPage: 30,
  page: 1,
};

const defaultSWRConfig: ConfigInterface = {
  refreshInterval: 10000,
};

function useFetchCurrencies(config = defaultConfig) {
  const { currency } = {
    ...defaultConfig,
    ...config,
  };
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;

  return useSWR(url, fetcher, { ...defaultSWRConfig });
}

export { useFetchCurrencies };
