import * as React from "react";
import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "../utils/testUtils";
import App from "../App";
import { server } from "../mocks/server";
import { rest } from "msw";
import { testData } from "../mocks/handlers";
import { formatPercentage } from "../utils/numberFormat";

test("should load the app properly", async () => {
  // we'll need this to simulate how the numbers are formatted in the app
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  });

  // render the app and verify if everything works as expected
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByText(new RegExp(testData.name, "i"))).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(testData.currency, "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      new RegExp(formatter.format(parseFloat(testData.price)), "i")
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(formatPercentage(testData["1d"].price_change_pct))
  ).toBeInTheDocument();
  expect(screen.getByAltText(testData.logo_url)).toBeInTheDocument();

  // override the existing handler and pass in a new price and price
  // change % because we'll assume that the API returns new values if
  // the fiat conversion changes
  const newPrice = "1234567.89";
  const newPriceChangePct = "-0.0123";

  server.use(
    rest.get(
      `https://api.nomics.com/v1/currencies/ticker`,
      async (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              id: "BTC",
              currency: "BTC",
              symbol: "BTC",
              name: "Bitcoin",
              price: newPrice,
              rank: "1",
              logo_url:
                "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
              "1d": {
                price_change_pct: newPriceChangePct,
              },
            },
          ])
        );
      }
    )
  );

  // click the fiat dropdown menu and press on an option provided
  const [dropdownButton] = screen.getAllByRole("button");
  userEvent.click(dropdownButton);
  const fiat = screen.getByRole("option", { name: /EUR/ });
  userEvent.click(fiat);

  // verify if the new values reflect in the app
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByText(new RegExp(testData.name, "i"))).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(testData.currency, "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(formatter.format(parseFloat(newPrice)), "i"))
  ).toBeInTheDocument();
  expect(
    screen.getByText(formatPercentage(newPriceChangePct))
  ).toBeInTheDocument();
  expect(screen.getByAltText(testData.logo_url)).toBeInTheDocument();
});

test("should display error screen when an unexpected server error occurs", async () => {
  server.use(
    rest.get(
      `https://api.nomics.com/v1/currencies/ticker`,
      async (_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: "something went wrong" })
        );
      }
    )
  );

  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByRole("alert")).toHaveTextContent(/something went wrong/i);
});
