import React from 'react'
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowLeftIcon, ArrowRightIcon } from '../account-search/assets/Icons'
import { DoubleArrowLeft } from './Icons/DoubleArrowLeft'
import { DoubleArrowRight } from './Icons/DoubleArrowRight'
import { EmptyStateIcon } from './Icons/EmptyState'

export interface TableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
}

export const CustomTable = <T extends object>({ data = [], columns = [] }) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  })

  return (
    <>
      <table className="relative min-w-full divide-y divide-gray-300 border border-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-96 px-3 py-4 text-center font-semibold text-gray-500"
              >
                <EmptyStateIcon className="mx-auto h-16 w-16" />
                No data to display
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="hover:bg-primary-lightest">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between gap-2 text-sm">
        <div>
          <label className="mr-2">Records per page</label>
          <select
            className="rounded-sm border border-gray-300 p-1"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div>
          Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
          {table.getRowCount().toLocaleString()} Rows
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`p-1 ${!table.getCanPreviousPage() ? 'opacity-50' : 'cursor-pointer'}`}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeft />
          </button>
          <button
            className={`p-1 ${!table.getCanPreviousPage() ? 'opacity-50' : 'cursor-pointer'}`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeftIcon />
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <button
            className={`p-1 ${!table.getCanNextPage() ? 'opacity-50' : 'cursor-pointer'}`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRightIcon />
          </button>
          <button
            className={`p-1 ${!table.getCanNextPage() ? 'opacity-50' : 'cursor-pointer'}`}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRight />
          </button>
        </div>
      </div>
    </>
  )
}
