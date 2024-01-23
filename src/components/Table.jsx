"use client";

import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Chip, Tabs, Tab } from "@mui/material-next";
import Paper from "@mui/material/Paper";
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
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

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
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const columns = [
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "difficulty",
      headerName: "Difficulty",
      width: 150,
      renderCell: (params) => (
        <div className="flex flex-row">
          <Chip label={params.value} color="primary" variant="outlined" />
        </div>
      ),
    },
    {
      field: "language",
      headerName: "Language",
      sortable: false,
      renderCell: (params) => (
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
      ),
      width: 300,
    },
  ];
  const rows = [];
  let id = 0;
  for (const algorithm in algorithmList) {
    const language = algorithmList[algorithm];
    id++;
    rows.push({
      id,
      difficulty: algorithm.split("/")[1],
      title: algorithm.split("/")[2].replace(/-/g, " "),
      language: language.join(", "),
      path: algorithm,
    });
  }

  rows.sort((a, b) => a.title.localeCompare(b.title));
  return (
    <Paper elevation={0}>
      <Tabs
        value={value}
        variant="fullWidth"
        onChange={(e, v) => {
          setValue(v);
          setSearch("");
        }}
        aria-label="tabs"
        sx={{ marginBottom: 2 }}
      >
        {platforms.map((platform, index) => (
          <Tab key={index} label={platform} value={platform} />
        ))}
      </Tabs>
      <TextField
        label="Search"
        variant="standard"
        value={search}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
        InputProps={{
          startAdornment: <Search />,
        }}
        fullWidth
      />
      <DataGrid
        columns={columns}
        rows={rows.filter(
          (row) =>
            row.path.includes(value) &&
            row.title.toLowerCase().includes(search.toLowerCase()),
        )}
        density="comfortable"
        disableColumnSelector
        disableColumnFilter
        autoHeight
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10]}
        onRowClick={(params) => {
          const path = `/algorithm/${params.row.path.split("/").slice(0, 3).join("/")}`;
          router.push(path);
        }}
        sx={{
          [`& .${gridClasses.cell}:focus, .${gridClasses.cell}:focus-within,`]:
            { outline: "none" },
          [`& .${gridClasses.columnHeader}:focus, .${gridClasses.columnHeader}:focus-within,`]:
            { outline: "none" },
        }}
      />
    </Paper>
  );
}
