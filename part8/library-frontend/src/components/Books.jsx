import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import GenresBar from "./GenresBar";

import { useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("All");

  if (!props.show || !props.books) {
    return null;
  }

  return (
    <>
      <Paper sx={{ margin: "auto", backgroundColor: "white", padding: "3em" }}>
        <h2 style={{ padding: "1em", paddingTop: 0 }}>books</h2>

        <TableContainer
          sx={{ minWidth: "50%", maxWidth: "500px" }}
          component={Paper}
          elevation={5}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">title</TableCell>
                <TableCell align="left">author</TableCell>
                <TableCell align="right">published</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.books.map((a) => {
                if (a.genres.includes(filter) || filter === 'All') {
                  return (
                    <TableRow key={a.title}>
                      <TableCell align="left">{a.title}</TableCell>
                      <TableCell align="left">{a.author.name}</TableCell>
                      <TableCell align="right">{a.published}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <GenresBar setFilter={setFilter} genres={props.genres} />
      </Paper>
    </>
  );
};

export default Books;
