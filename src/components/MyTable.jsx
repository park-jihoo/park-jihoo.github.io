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
    .filter((row) => row.title.toLowerCase())
    .sort((a, b) => a.title.localeCompare(b.title));
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
      color: "secondary",
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
          >
            Title
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="w-4 h-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="w-4 h-4" />
            ) : (
              <ArrowUpDownIcon className="w-4 h-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="line-clamp-2 truncate"> {row.getValue("title")} </p>
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
          <p className="line-clamp-2 truncate"> {row.getValue("platform")} </p>
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
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="line-clamp-2 truncate">
            {" "}
            {row.getValue("difficulty")}{" "}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => (
        <div className="flex items-center flex-wrap gap-1.5">
          {row
            .getValue("language")
            .split(",")
            .map((lang) => (
              <Badge key={lang} className="items-center space-x-1">
                {lang}
                {/*<span>{lang}</span>*/}
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
    <div className="space-y-4 m-4">
      <div className="flex items-center flex-col sm:flex-row gap-4">
        <DataTable data={rows} columns={columns} onRowClick={handleRowClick} />
      </div>
    </div>
  );
}

MyTable.propTypes = {
  algorithmList: PropTypes.object.isRequired,
};
