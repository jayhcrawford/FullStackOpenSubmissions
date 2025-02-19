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
import { Button, TextField } from "@mui/material";

import { useEffect } from "react";

const Recommendations = (props) => {
  const [filter, setFilter] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [newFavGenre, setNewFavGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(null);
  const [sorryNoBooks, setSorryNoBooks] = useState(false);

  if (!props.show || !props.books || !props.token) {
    return null;
  }

  //if the user's favorite genre is not contained in the library's genres, default filter to 'All'
  if (filter == null && props.genres.includes(props.token.favoriteGenre)) {
    setFilter(props.token.favoriteGenre)
  } else if (filter == null && !props.genres.includes(props.token.favoriteGenre)) {
    setFilter('All')
  }

  //if the favorite genre is not in state, set it from localStorage token
  if (!favoriteGenre) {
    setFavoriteGenre(props.token.favoriteGenre)
  }

  const handleInputNewFav = (event) => {
    setNewFavGenre(event.target.value);
  };

  const handleSubmitNewFav = async () => {
    const result = await props.updateFavGenre({
      variables: { token: props.token.returnToken, favoriteGenre: newFavGenre },
    });

    if (Object.hasOwn(result.data, "editFavGenre")) {
      const newLocalToken = {
        ...props.token,
        favoriteGenre: result.data.editFavGenre.genre,
      };
      props.setToken(newLocalToken);
      localStorage.setItem("LoginToken", JSON.stringify(newLocalToken));
      setFavoriteGenre(result.data.editFavGenre.genre);
      setNewFavGenre("");
    }
  };

  return (
    <>
      <Paper sx={{ margin: "auto", backgroundColor: "white", padding: "3em" }}>
        <h2 style={{ padding: "1em", paddingTop: 0 }}>recommendations</h2>
        <p>
          your favorite genre is: <b>{favoriteGenre}</b>
        </p>
        {sorryNoBooks && (
          <>
            <br />{" "}
            <p>
              <i>
                Sorry, it looks like there are no books in your favorite genre
              </i>
            </p>
          </>
        )}
        <br />
        <p>pick a new favorite genre: </p>

        <TextField
          onChange={(event) => handleInputNewFav(event)}
          value={newFavGenre}
          style={{ marginBottom: ".3em", marginTop: ".5em" }}
        />
        <br />
        <Button
          sx={{ color: "white", backgroundColor: "black", marginBottom: "2em" }}
          variant="contained"
          onClick={handleSubmitNewFav}
        >
          Submit
        </Button>
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
                if (a.genres.includes(filter) || filter === "All") {
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
        <GenresBar
          setFilter={setFilter}
          filter={filter}
          genres={props.genres}
          filterGenre={props.filterGenre}
          setFilteredBooks={setFilteredBooks}
        />
      </Paper>
    </>
  );
};

export default Recommendations;
