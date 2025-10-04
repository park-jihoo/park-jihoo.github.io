"use client";

// import {
//   Database,
//   LanguageC,
//   LanguageCpp,
//   LanguageJava,
//   LanguageJavascript,
//   LanguagePython,
// } from "mdi-material-ui";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

export default function MyTable({ algorithmList }) {
  const router = useRouter();
  // const languageIcon = {
  //   c: <LanguageC className="mr-1" />,
  //   cc: <LanguageCpp className="mr-1" />,
  //   cpp: <LanguageCpp className="mr-1" />,
  //   py: <LanguagePython className="mr-1" />,
  //   sql: <Database className="mr-1" />,
  //   java: <LanguageJava className="mr-1" />,
  //   js: <LanguageJavascript className="mr-1" />,
  // };

  // const languageIcon = {
  //   c: "C",
  //   cc: "C++",
  //   cpp: "C++",
  //   py: "Python",
  //   sql: "SQL",
  //   java: "Java",
  //   js: "JavaScript",
  // };

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
            <ChevronsUpDown className="ml-2 w-4 h-4" />
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
      header: "Platform",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="line-clamp-2 truncate"> {row.getValue("platform")} </p>
        </div>
      ),
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="line-clamp-2 truncate"> {row.getValue("difficulty")} </p>
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
        <DataTable
          data={rows}
          columns={columns}
          className="hover:bg-gray-100 transition-colors duration-200"
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

MyTable.propTypes = {
  algorithmList: PropTypes.object.isRequired,
};
