/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { useTable } from "react-table";
import {
  CoinLogo,
  CurrencyText,
  PAlignRight,
  PercentageText,
  Table,
} from "./lib";

type CellValueProp = {
  value: string;
};

function getColumnStyles(columnId: string) {
  switch (columnId) {
    case "price":
      return { width: "105px" };

    case "24h%":
      return { width: "50px" };

    default:
      return undefined;
  }
}

function CryptoTable({ data }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "market_cap_rank",
      },
      {
        accessor: "image",
        Cell: ({ value: logo_url }: CellValueProp) => (
          <div
            css={{
              maxWidth: "26px",
              maxHeight: "26px",
              height: "26px",
              width: "26px",
              textAlign: "center",
              margin: "6px",
            }}
          >
            <CoinLogo src={logo_url} alt={logo_url} />
          </div>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: (props: any) => {
          return (
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <p
                css={{
                  width: "80px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 500,
                  color: "var(--color-secondary)",
                }}
              >
                {props.value}
              </p>
            </div>
          );
        },
      },
      {
        Header: () => <PAlignRight>Price</PAlignRight>,
        accessor: "current_price",
        Cell: ({ value }: CellValueProp) => <CurrencyText value={value} />,
      },
      {
        Header: () => <PAlignRight>24h %</PAlignRight>,
        accessor: (row: any) => row.price_change_percentage_24h,
        id: "24h%",
        Cell: ({ value }: CellValueProp) => <PercentageText value={value} />,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps({
                  style: {
                    borderTop: `1px solid var(--color-hover)`,
                    borderBottom: `1px solid var(--color-hover)`,
                    color: "var(--color-secondary)",
                    fontSize: "12px",
                    fontWeight: 300,
                    ...getColumnStyles(column.id),
                  },
                })}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              css={css`
                &:hover {
                  background-color: var(--color-hover);
                }
              `}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CryptoTable;
