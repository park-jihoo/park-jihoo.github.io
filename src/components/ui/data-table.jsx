"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import PropTypes from "prop-types";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// OR 조건으로 작동하는 커스텀 필터 함수
const orFilterFn = (row, columnId, filterValue) => {
  // null이면 모든 행을 표시 (필터 없음)
  if (filterValue == null) return true;
  // 빈 배열이면 아무것도 표시하지 않음
  if (filterValue.length === 0) return false;
  const cellValue = row.getValue(columnId);
  return filterValue.includes(cellValue);
};

// multi_select를 위한 OR 필터 함수 (쉼표로 구분된 값들을 처리)
const multiSelectOrFilterFn = (row, columnId, filterValue) => {
  // null이면 모든 행을 표시 (필터 없음)
  if (filterValue == null) return true;
  // 빈 배열이면 아무것도 표시하지 않음
  if (filterValue.length === 0) return false;
  const cellValue = row.getValue(columnId);
  if (!cellValue) return false;
  
  // 쉼표로 구분된 값들을 배열로 변환
  const cellValues = cellValue.split(',').map(v => v.trim());
  
  // 선택된 필터 값 중 하나라도 셀 값에 포함되어 있으면 true
  return filterValue.some(filterVal => 
    cellValues.includes(filterVal)
  );
};

export function DataTable({
  columns,
  data,
  onRowClick,
  searchColumn = "title",
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    filterFns: {
      or: orFilterFn,
      multiSelectOr: multiSelectOrFilterFn,
    },
    state: {
      columnFilters,
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* 검색 및 컬럼 가시성 컨트롤 */}
      <div className="flex items-center py-4">
        <Input
          placeholder={`Search ${searchColumn}...`}
          value={table.getColumn(searchColumn)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 테이블 */}
      <div className="rounded-md border">
        <Table className="min-w-full max-w-fit text-left table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="h-12">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-12">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                  className={`h-12 ${onRowClick ? "cursor-pointer" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-12">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-12">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 페이지네이션 */}
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export function DataTablePagination({ table }) {
  return (
    <div className="flex items-center justify-between px-2 mb-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {/*{table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
        {/*{table.getFilteredRowModel().rows.length} row(s) selected.*/}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  searchColumn: PropTypes.string,
};

DataTablePagination.propTypes = {
  table: PropTypes.object.isRequired,
};

export function DataTableFilter({ column, title, options }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(!open)}>
          {title}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={
            column.getFilterValue() == null ||
            options.every((option) =>
              column.getFilterValue()?.includes(option.value),
            )
          }
          onCheckedChange={(checked) =>
            column.setFilterValue(
              checked ? options.map((option) => option.value) : [],
            )
          }
        >
          <Badge variant="secondary">All</Badge>
        </DropdownMenuCheckboxItem>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            checked={
              column.getFilterValue() != null &&
              column.getFilterValue()?.includes(option.value)
            }
            onCheckedChange={(checked) => {
              if (checked) {
                // 옵션을 선택할 때: null이면 빈 배열로 시작, 아니면 기존 배열에 추가
                const currentValue = column.getFilterValue() ?? [];
                const newValue = [...currentValue, option.value];
                column.setFilterValue(newValue);
              } else {
                // 옵션을 해제할 때: 해당 값만 제거
                const currentValue = column.getFilterValue() ?? [];
                const newValue = currentValue.filter((value) => value !== option.value);
                column.setFilterValue(newValue.length > 0 ? newValue : []);
              }
            }}
            key={option.id}
          >
            <Badge variant={option.color || "secondary"}>{option.value}</Badge>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

DataTableFilter.propTypes = {
  column: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
