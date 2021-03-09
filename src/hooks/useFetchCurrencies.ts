import useSWR, { ConfigInterface } from "swr";
import { fetcher } from "../utils/fetcher";

interface FetchCurrenciesConfig {
  interval?: string;
  convert?: string;
  status?: string;
  perPage?: number;
  page?: number;
}

const defaultConfig: FetchCurrenciesConfig = {
  interval: "1d",
  convert: "PHP",
  status: "active",
  perPage: 30,
  page: 1,
};

const defaultSWRConfig: ConfigInterface = {
  refreshInterval: 10000,
};

function useFetchCurrencies(config = defaultConfig) {
  const { interval, convert, status, page, perPage } = {...defaultConfig, ...config};
  const url = `https://api.nomics.com/v1/currencies/ticker?interval=${interval}&convert=${convert}&status=${status}&per-page=${perPage}&page=${page}&key=${process.env.REACT_APP_API_KEY}`;

  return useSWR(url, fetcher, { ...defaultSWRConfig });
}

export { useFetchCurrencies };
