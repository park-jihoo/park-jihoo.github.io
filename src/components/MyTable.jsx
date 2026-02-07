"use client";

import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableFilter } from "@/components/ui/data-table";

export default function MyTable({ algorithmList }) {
  const router = useRouter();

  const rows = Object.entries(algorithmList)
    .map(([algorithm, language], id) => {
      const [platform, difficulty, title] = algorithm.split("/");
      return {
        id,
        platform,
        difficulty,
        title: title.replace(/-/g, " "),
        language: language.join(", "),
        path: algorithm,
      };
    })
    // No need to filter here, DataTable handles filtering via tanstack-table
    .toSorted((a, b) => a.title.localeCompare(b.title));

  const getUniqueSelectValues = (propertyKey) => {
    const uniqueValues = new Set();
    rows.forEach((row) => {
      const value = row[propertyKey];
      if (value !== undefined) {
        uniqueValues.add(value);
      }
    });
    return Array.from(uniqueValues).map((value) => ({
      id: value,
      value: value,
      label: value,
    }));
  };

  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0 font-medium transition-colors hover:bg-accent/80"
          >
            Title
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 size-4 text-muted-foreground" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 size-4 text-muted-foreground" />
            ) : (
              <ArrowUpDownIcon className="ml-2 size-4 text-muted-foreground" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="font-medium">{row.getValue("title")}</span>
        </div>
      ),
    },
    {
      accessorKey: "platform",
      filterFn: "or",
      header: ({ column }) => (
        <DataTableFilter
          column={column}
          title="Platform"
          options={getUniqueSelectValues("platform")}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Badge
            variant="outline"
            className="font-normal text-muted-foreground"
          >
            {row.getValue("platform")}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "difficulty",
      filterFn: "or",
      header: ({ column }) => (
        <DataTableFilter
          column={column}
          title="Difficulty"
          options={getUniqueSelectValues("difficulty")}
        />
      ),
      cell: ({ row }) => {
        const diff = row.getValue("difficulty");
        const variant =
          diff === "Easy"
            ? "default"
            : diff === "Medium"
              ? "secondary"
              : "destructive";
        return (
          <div className="flex items-center">
            <Badge variant={variant} className="text-xs font-medium capitalize">
              {diff}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => (
        <div className="flex items-center flex-wrap gap-1">
          {row
            .getValue("language")
            .split(",")
            .map((lang) => (
              <Badge
                key={lang}
                variant="secondary"
                className="h-5 px-1.5 py-0 text-xs font-normal"
              >
                {lang.trim()}
              </Badge>
            ))}
        </div>
      ),
    },
  ];

  const handleRowClick = (row) => {
    const slug = row.path.split("/").slice(0, 3).join("/");
    router.push(`/algorithm/${slug}`);
  };

  return (
    <div className="space-y-4">
      <DataTable
        data={rows}
        columns={columns}
        onRowClick={handleRowClick}
        searchColumn="title"
        className="border-0"
      />
    </div>
  );
}

MyTable.propTypes = {
  algorithmList: PropTypes.object.isRequired,
};
