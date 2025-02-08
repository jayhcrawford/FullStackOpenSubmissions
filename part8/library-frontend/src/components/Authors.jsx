import * as React from "react";
import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Input, TextField } from "@mui/material";
import { Button } from "@mui/material";

import MiniBox from "./MiniBox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function BasicSelect(props) {
  const [name, setName] = React.useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="select-label">{props.inputLabel}</InputLabel>
        <Select
          labelId="select-label"
          value={name}
          label="Age"
          onChange={handleChange}
        >
          {props.authors.map((author) => {
            return <MenuItem key={author.name}>{author.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

const Authors = (props) => {
  const [birthyear, setBirthyear] = useState("");

  if (!props.show || !props.authors) {
    return null;
  }

  const handleSubmitBirthyear = (event) => {
    event.preventDefault();
    const setBornTo = birthyear;
    const token = props.token.returnToken;

    const name = event.target.authorInput.value;

    props.updateAuthor({ variables: { token, name, setBornTo } });

    setBirthyear("");
  };

  const onInputBirthYear = (event) => {
    setBirthyear(Number(event.target.value));
  };

  return (
    <Paper sx={{ margin: "auto", backgroundColor: "white", padding: "3em" }}>
      <h2 style={{ padding: "1em", paddingTop: 0 }}>authors</h2>
      <TableContainer
        sx={{ minWidth: "50%", maxWidth: "500px" }}
        component={Paper}
        elevation={5}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">name</TableCell>
              <TableCell align="left">born</TableCell>
              <TableCell align="left">books</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.authors.map((a) => (
              <TableRow key={a.name}>
                <TableCell align="left">{a.name}</TableCell>
                <TableCell align="left">{a.born}</TableCell>
                <TableCell align="left">{a.bookCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {props.token && (
        <MiniBox>
          <Grid container spacing={2}>
            <h3>Set author's birthyear</h3>
            <form onSubmit={handleSubmitBirthyear}>
              <Grid size={12}>
                <select style={{ width: "100%" }} name="authorInput">
                  {props.authors.map((a) => {
                    return (
                      <option key={a.name} value={a.name}>
                        {a.name}
                      </option>
                    );
                  })}
                </select>
              </Grid>
              <Grid size={12}>
                birthyear
                <TextField
                  // value={name} instead of this line write below line
                  value={birthyear ? birthyear : ""}
                  onChange={onInputBirthYear}
                  labelid="yearInput"
                  type="number"
                  name="yearInput"
                  style={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "black",
                  }}
                  variant="contained"
                  type="submit"
                >
                  update author
                </Button>
              </Grid>
            </form>
          </Grid>
        </MiniBox>
      )}
    </Paper>
  );
};

export default Authors;
