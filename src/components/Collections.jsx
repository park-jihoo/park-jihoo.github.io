import React from "react";
import {
  getBlockCollectionId,
  getBlockParentPage,
  getTextContent,
} from "notion-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DataTableFilter,
  DataTablePagination,
} from "@/components/ui/data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";

export const Collection = ({ block, className, ctx }) => {
  const context = React.useMemo(
    () => ({ ...ctx, level: ctx.level + 1 }),
    [ctx],
  );

  const [sorting, setSorting] = React.useState([]);

  const { recordMap } = ctx;
  const { view_ids: viewIds } = block;

  if (!viewIds || !viewIds.length) {
    return null;
  }

  const collectionId = getBlockCollectionId(block, recordMap);
  const collectionViewId = viewIds[0];
  const collection = recordMap.collection[collectionId]?.value;
  const collectionView = recordMap.collection_view[collectionViewId]?.value;
  const parentPage = getBlockParentPage(block, recordMap);
  const title = getTextContent(collection.name).trim();
  const showTitle =
    collectionView.format?.hide_linked_collection_name !== true && title;

  if (collection.icon) {
    block.format = {
      ...block.format,
      page_icon: collection.icon,
    };
  }

  const schemas = React.useMemo(
    () =>
      Object.entries(collection.schema)
        .filter(([key, schema]) =>
          ["title", "select", "multi_select"].includes(schema.type),
        )
        .sort((a, b) =>
          a[1].type === "title" ? -1 : a[1].name.localeCompare(b[1].name),
        ),
    [collection.schema],
  );

  const pages = React.useMemo(
    () =>
      collectionView.page_sort
        ?.map((id) => recordMap.block[id]?.value)
        .filter((page) => page?.type === "page"),
    [collectionView.page_sort, recordMap.block],
  );

  const columns = React.useMemo(
    () =>
      schemas.map(([key, schema]) => ({
        accessorKey: key,
        filterFn: (row, id, value) => {
          return value.includes(row.original.properties[id]?.[0]?.[0]);
        },
        sortingFn: (a, b, columnId) => {
          const valueA = a.original.properties[columnId];
          const valueB = b.original.properties[columnId];
          if (schema.type === "title") {
            return getTextContent(valueA).localeCompare(getTextContent(valueB));
          }
          return valueA?.[0]?.[0]?.localeCompare(valueB?.[0]?.[0]);
        },
        header: ({ column }) => {
          return schema.type === "title" ? (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {schema.name}
              {column.getIsSorted() === "asc" ? (
                <CaretDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <CaretUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          ) : (
            <DataTableFilter
              column={column}
              options={schema.options}
              title={schema.name}
            />
          );
        },
        cell: (info) => {
          const page = info.row.original;
          if (schema.type === "select") {
            const option = schema.options.find(
              (option) => option.value === page.properties[key]?.[0]?.[0],
            );
            return option ? (
              <Badge variant={option.color}>{option.value}</Badge>
            ) : (
              <Badge variant="destructive">N/A</Badge>
            );
          }
          return page.properties[key]
            ? getTextContent(page.properties[key])
            : "N/A";
        },
      })),
    [schemas],
  );

  const data = React.useMemo(() => pages, [pages]);

  const table = useReactTable(
    React.useMemo(
      () => ({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
          sorting,
        },
      }),
      [data, columns, sorting],
    ),
  );

  return (
    <div className={`${className} flex justify-center px-4`}>
      <div className="min-w-full max-w-fit items-center py-4 notion-collection overflow-y-auto">
        <Table className="border border-gray-200 shadow-sm table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <Link href={"/notes/" + row.original.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}{" "}
                      </Link>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
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
        <div className="py-4">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
};
