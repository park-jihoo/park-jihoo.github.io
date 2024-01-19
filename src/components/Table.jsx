"use client";

import { DataGrid } from "@mui/x-data-grid";
import { Chip, Tabs, Tab, Paper } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Database,
  LanguageC,
  LanguageCpp,
  LanguageJava,
  LanguageJavascript,
  LanguagePython,
} from "mdi-material-ui";

export default function Table({ algorithmList }) {
  const platforms = Array.from(
    new Set(
      Object.keys(algorithmList).map((algorithm) => algorithm.split("/")[0]),
    ),
  );

  const languageIcon = {
    c: <LanguageC />,
    cc: <LanguageCpp />,
    cpp: <LanguageCpp />,
    py: <LanguagePython />,
    sql: <Database />,
    java: <LanguageJava />,
    js: <LanguageJavascript />,
  };

  const router = useRouter();

  const [value, setValue] = useState(platforms[0]);

  const columns = [
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "difficulty",
      headerName: "Difficulty",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex flex-row">
            <Chip label={params.value} color="primary" variant="outlined" />
          </div>
        );
      },
    },
    {
      field: "language",
      headerName: "Language",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex flex-row">
            {params.value.split(", ").map((lang, index) => (
              <Chip
                key={index}
                label={languageIcon[lang]}
                sx={{ marginRight: "5px" }}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
        );
      },
      width: 300,
    },
  ];
  let rows = [];
  let id = 0;
  for (const algorithm in algorithmList) {
    const language = algorithmList[algorithm];
    id++;
    rows.push({
      id: id,
      difficulty: algorithm.split("/")[1],
      title: algorithm.split("/")[2],
      language: language.join(", "),
      path: algorithm,
    });
  }
  return (
    <Paper variant="flat">
      <Tabs
        value={value}
        variant="fullWidth"
        onChange={(e, v) => setValue(v)}
        aria-label="tabs"
        sx={{ padding: 2 }}
      >
        {platforms.map((platform, index) => (
          <Tab key={index} label={platform} value={platform} />
        ))}
      </Tabs>
      <DataGrid
        columns={columns}
        rows={rows.filter((row) => row.path.includes(value))}
        density="comfortable"
        disableColumnSelector={true}
        disableColumnFilter={true}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10]}
        onRowClick={(params) => {
          const path =
            "/algorithm/" + params.row.path.split("/").slice(0, 3).join("/");
          router.push(path);
        }}
      />
    </Paper>
  );
}
