/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as React from "react";
import { useTable } from "react-table";
import { CoinLogo, CurrencyText, P, PercentageText, Table } from "./lib";

interface CellValueProp {
  value: string;
}

function getColumnStyles(columnId: string) {
  switch (columnId) {
    case "price":
      return { style: { width: "100px" } };

    case "24h%":
      return { style: { width: "50px" } };

    default:
      return undefined;
  }
}

function CryptoTable({ data }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "rank",
      },
      {
        accessor: "logo_url",
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
        accessor: "currency",
        Cell: ({ value: currency }: CellValueProp) => (
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p css={{ fontWeight: "bold" }}>{currency}</p>
          </div>
        ),
      },
      {
        Header: () => <P>Price</P>,
        accessor: "price",
        Cell: ({ value }: CellValueProp) => <CurrencyText value={value} />,
      },
      {
        Header: () => <P>24H %</P>,
        accessor: (row: any) => row["1d"].price_change_pct,
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
              <th {...column.getHeaderProps({ ...getColumnStyles(column.id) })}>
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
                padding: 33px;
                &:hover {
                  background-color: black;
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
