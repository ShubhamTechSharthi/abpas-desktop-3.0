import { usePagination, useSortBy, useTable } from "react-table";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { RiPlayReverseFill, RiPlayFill } from "react-icons/ri";
import { useMemo } from "react";

export default function ReactTableComponent({ tableData, tableColumns }) {
  const tabledata = useMemo(() => tableData, []);
  const tablecolumns = useMemo(() => tableColumns, []);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns: tablecolumns,
        data: tabledata,
        initialState: { pageSize: 15 },
      },
      useSortBy,
      usePagination
    );

  return (
    <div className="border-[1px] border-slate-300 flex flex-col gap-5 w-full px-5 py-2 rounded-lg table-resposive">
      <table
        className="table w-full min-w-max border-1 table-auto text-left"
        {...getTableProps()}
      >
        <thead className="bg-slate-500">
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th
                  className="p-4 text-center text-white border-r-[1px] border-l-[1px] border-b-[1px] border-slate-300"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>{column.isSortedDesc ? " 🔼" : " 🔽"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr
                className="even:bg-[#f3f3f3] odd:bg-white"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    className="p-4 text-center border-l-[1px] border-r-[1px] border-slate-300"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
