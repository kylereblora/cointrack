import { rest } from "msw";

export const testData = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  current_price: "55404.13",
  market_cap_rank: "1",
  image:
    "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
  price_change_percentage_24h: "-0.0102",
};

export const handlers = [
  rest.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD`,
    async (_, res, ctx) => {
      // simulate a response for BTC with only the essential info needed in the app
      return res(
        ctx.status(200),
        ctx.json([
          {...testData},
        ])
      );
    }
  ),
];
