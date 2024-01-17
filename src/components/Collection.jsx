import React from "react";
import {
  Chip,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Collection = ({ block, className, ctx }) => {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {classes.map((c) => (
          <Tab label={c} value={c} key={c} />
        ))}
      </Tabs>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((row) => {
                if (value === undefined) return true;
                return row.class === value;
              })
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => {
                    router.push(`/notes/${row.id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Chip label={row.subclass} sx={{ marginRight: 1 }} />
                    {row.title}
                  </TableCell>
                </TableRow>
              ))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
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
                showFirstButton={true}
                showLastButton={true}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
