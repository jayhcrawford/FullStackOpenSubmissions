import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, UPDATE_AUTHOR } from "./queries/queries";

import { Button, ButtonGroup } from "@mui/material";

const App = () => {
  //console.trace()
  const books = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);

  const [udpateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

    const [createBook] = useMutation(CREATE_BOOK, {
      refetchQueries: [{ query: ALL_BOOKS }],
    });
  

  let booksArray;
  let authorArray;
  if (!books.loading) {
    booksArray = books.data.allBooks;
  }
  if (!authors.loading) {
    authorArray = authors.data.allAuthors;
  }

  return (
    <>
      <header style={{ backgroundColor: "lightGrey", padding: 20, margin: 0 }}>
        <ButtonGroup
          sx={{
            ".MuiButtonGroup-grouped": {
              borderColor: "transparent",
              "&:hover": {
                backgroundColor: "grey",
              },
              backgroundColor: "black",
            },
          }}
          variant="contained"
          aria-label="Basic button group"
        >
          <Link to="/">
            <Button>Authors</Button>
          </Link>
          <Link to="/books">
            <Button>Books</Button>
          </Link>
          <Link to="/addBook">
            <Button>Add Book</Button>
          </Link>
        </ButtonGroup>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <Authors
              udpateAuthor={udpateAuthor}
              show={true}
              authors={authorArray}
            />
          }
        />
        <Route
          path="/books"
          element={<Books show={true} books={booksArray} />}
        />
        <Route path="/addBook" element={<NewBook createBook={createBook} show={true} />} />
      </Routes>
    </>
  );
};

export default App;

{
  /*  */
}
