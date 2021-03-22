import * as React from "react";
import { render, screen, userEvent } from "../utils/testUtils";
import Header from "../components/header";

test("renders the header component properly", () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});

test("should update fiat conversion when dropdown is pressed", () => {
  render(<Header />);

  // get the dropdown button element, then click it
  const [dropdownButton] = screen.getAllByRole("button");
  userEvent.click(dropdownButton);

  // get an option inside the dropdown list, doesn't matter which
  const fiat = screen.getByRole("option", { name: /EUR/ });
  userEvent.click(fiat);

  expect(dropdownButton).toHaveTextContent(/EUR/);
});
