import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";



const Books = (props) => {
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
                <TableCell align="left">published</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.books.map((a) => (
                <TableRow key={a.title}>
                  <TableCell align="left">{a.title}</TableCell>
                  <TableCell align="left">{a.author}</TableCell>
                  <TableCell align="right">{a.published}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </>
  );
};

export default Books;
