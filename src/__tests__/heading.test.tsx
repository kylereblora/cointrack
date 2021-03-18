import * as React from "react";
import { render, screen } from "../utils/testUtils";
import Header from "../components/header";

test("renders the header component properly", () => {
  const headerText = "CoinTrack";
  const defaultDropdownChoice = "USD";

  render(<Header />);

  const heading = screen.getByText(headerText);
  const dropdown = screen.getByRole("button");

  expect(heading).toHaveTextContent(headerText);
  expect(dropdown).toHaveTextContent(defaultDropdownChoice);
});
