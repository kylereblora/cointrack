/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { useSelect } from "downshift";
import { useCurrency } from "../hooks/useCurrency";
import { Button } from "./lib";
import { FiChevronDown } from "react-icons/fi";

const fiatItems = ["USD", "EUR", "JPY", "KRW", "PHP"];

function FiatDropdown() {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: fiatItems });

  const [fiat, setFiat] = useCurrency();

  return (
    <div>
      <div
        css={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="button" {...getToggleButtonProps()}>
          {selectedItem || fiat}
          <FiChevronDown
            css={{
              marginLeft: "6px",
            }}
          />
        </Button>
      </div>
      <ul
        css={{
          listStyle: "none",
          position: "absolute",
          zIndex: 1000,
          minWidth: "60px",
          backgroundColor: "var(--color-background)",
          border: "none",
        }}
        {...getMenuProps()}
      >
        {isOpen &&
          fiatItems.map((item, index) => (
            <li
              css={{
                padding: "5px",
              }}
              style={
                highlightedIndex === index
                  ? { backgroundColor: "var(--color-hover)" }
                  : {}
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
