/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { useSelect } from "downshift";
import { useCurrency } from "../hooks/useCurrency";

const fiatItems = ["PHP", "USD", "EUR", "JPY"];

function FiatDropdown() {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: fiatItems });

  const [fiat, setFiat] = useCurrency();

  console.log({ ...getToggleButtonProps() });
  return (
    <div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label {...getLabelProps()}>Currency</label>
        <button type="button" {...getToggleButtonProps()}>
          {selectedItem || fiat}
        </button>
      </div>
      <ul
        css={{
          listStyle: "none",
        }}
        {...getMenuProps()}
      >
        {isOpen &&
          fiatItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
                onClick: () => {
                  setFiat(item);
                },
              })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FiatDropdown;
