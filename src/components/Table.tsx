import * as React from "react";
import { useTable } from "react-table";
import { formatPercentage, formatCurrency } from "../utils/numberFormat";

function Table({ data }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "rank",
      },
      {
        Header: "Name",
        accessor: (row: any) => (
          <div style={{ display: "flex" }}>
            <img
              style={{
                maxWidth: "30px",
                maxHeight: "20px",
                width: "auto",
                height: "auto",
              }}
              src={row.logo_url}
              alt={row.currency}
            />
            <span>
              <p>{row.name}</p> <p>{row.currency}</p>
            </span>
          </div>
        ),
      },
      {
        Header: () => <p style={{ textAlign: "right" }}>Price</p>,
        accessor: "price",
        Cell: ({ value }: { value: string }) => (
          <p style={{ textAlign: "right" }}>{formatCurrency(value)}</p>
        ),
      },
      {
        Header: "24h %",
        accessor: (row: any) => row["1d"].price_change_pct,
        Cell: ({ value }: { value: string }) => (
          <p style={{ textAlign: "right" }}>{formatPercentage(value)}%</p>
        ),
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
    <table {...getTableProps()}>
      <thead
        style={{
          textAlign: "left",
        }}
      >
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
