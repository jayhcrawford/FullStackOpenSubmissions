import { useState } from "react";
import { CREATE_BOOK, ALL_BOOKS } from "../queries/queries";
import { useMutation } from "@apollo/client";
import MiniBox from "./MiniBox";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const NewBook = (props) => {
  const [title, setTitle] = useState("Jerrod's Great Book");
  const [author, setAuthor] = useState("Jerrod");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    const token = props.token.returnToken;

    props.createBook({
      variables: { token, title, author, published, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.toLowerCase()));
    setGenre("");
  };

  return (
    <MiniBox>
      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            title
            <TextField
              style={{ width: "100%" }}
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Grid>
          <Grid size={12}>
            author
            <TextField
              style={{ width: "100%" }}
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Grid>
          <Grid size={12}>
            published
            <TextField
              style={{ width: "100%" }}
              value={published}
              type="number"
              onChange={({ target }) => setPublished(Number(target.value))}
            />
          </Grid>
          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              style={{ width: "60%" }}
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <Button
              variant="contained"
              onClick={addGenre}
              style={{ width: "40%" }}
              type="button"
              sx={{
                backgroundColor: "black",
              }}
            >
              add genre
            </Button>
          </Grid>
          <Grid size={12}>
            <div>genres: {genres.join(" ")}</div>
          </Grid>
          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "black",
              }}
            >
              create book
            </Button>
          </Grid>
        </Grid>
      </form>
    </MiniBox>
  );
};

export default NewBook;
