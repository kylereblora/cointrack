import { rest } from "msw";

export const testData = {
  id: "BTC",
  currency: "BTC",
  symbol: "BTC",
  name: "Bitcoin",
  price: "55404.13",
  rank: "1",
  logo_url:
    "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
  "1d": {
    price_change_pct: "-0.0102",
  },
};

export const handlers = [
  rest.get(
    `https://api.nomics.com/v1/currencies/ticker`,
    async (_, res, ctx) => {
      // simulate a response for BTC with only the essential info needed in the app
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: testData.id,
            currency: testData.currency,
            symbol: testData.currency,
            name: testData.name,
            price: testData.price,
            rank: testData.rank,
            logo_url: testData.logo_url,
            "1d": testData["1d"],
          },
        ])
      );
    }
  ),
];
