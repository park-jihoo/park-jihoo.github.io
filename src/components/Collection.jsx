import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Chip, Tab, Tabs } from "@mui/material-next";
import TablePagination from "@mui/material-next/TablePagination";
import { useRouter } from "next/navigation";
import { Search } from "@mui/icons-material";

export function Collection({ block, className, ctx }) {
  if (ctx.recordMap.collection[block.collection_id] === undefined) return null;

  const collection = ctx.recordMap.collection[block.collection_id].value;
  const pages = Object.values(ctx.recordMap.block)
    .map((item) => item.value)
    .filter((item) => item.properties !== undefined)
    .sort((a, b) => {
      if (a.properties.title[0][0] === undefined) return -1;
      return a.properties.title[0][0].localeCompare(b.properties.title[0][0]);
    });

  const schema = Object.keys(collection.schema).reduce((acc, key) => {
    acc[key] = collection.schema[key].name;
    return acc;
  }, {});

  const data = pages.map((page) => {
    const row = {
      id: page.id,
    };
    Object.keys(page.properties).forEach((key) => {
      const value = page.properties[key][0][0];
      if (schema[key] !== undefined) row[schema[key]] = value;
    });
    return row;
  });

  const classes = Array.from(new Set(data.map((row) => row.class))).sort();
  const [value, setValue] = useState(classes[0]);

  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const changeTab = (e, newValue) => {
    setValue(newValue);
    setPage(0);
    setSearch("");
  };

  const filterData = data.filter((row) => {
    if (value === undefined) return true;
    return row.class === value;
  });

  const searchData = filterData.filter((row) => {
    if (search === "") return true;
    return row.title.includes(search);
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        padding: "16px",
      }}
    >
      <Tabs
        value={value}
        onChange={changeTab}
        variant="fullWidth"
        sx={{ marginBottom: 2 }}
      >
        {classes.map((c) => (
          <Tab label={c} value={c} key={c} />
        ))}
      </Tabs>
      <TextField
        label="Search"
        variant="standard"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <Search />,
        }}
        fullWidth
      />
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    router.push(`/notes/${row.id}`);
                  }}
                >
                  <TableCell component="td" scope="row">
                    <Chip
                      label={row.subclass}
                      sx={{ marginRight: 1 }}
                      color="primary"
                      variant="outlined"
                    />
                    {row.title}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={
                  data.filter((row) => {
                    if (value === undefined) return true;
                    return row.class === value;
                  }).length
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton
                showLastButton
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
