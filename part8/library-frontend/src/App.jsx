import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  CREATE_BOOK,
  UPDATE_AUTHOR,
  LOGIN,
} from "./queries/queries";

import { Button, ButtonGroup } from "@mui/material";
import Login from "./components/Login";

const App = () => {
  //console.trace()
  const books = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const client = useApolloClient();

  useEffect(() => {
    if (localStorage.getItem("LoginToken")) {
      setToken(localStorage.getItem("LoginToken"));
    }
  }, []);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const [login] = useMutation(LOGIN);

  let booksArray = [];
  let authorArray = [];
  if (!books.loading) {
    booksArray = books.data.allBooks;
  }
  if (!authors.loading) {
    authorArray = authors.data.allAuthors;
  }

  const loginHandler = async (event) => {
    event.preventDefault();
    const username = event.target.usernameInput.value;
    const password = event.target.passwordInput.value;
    const result = await login({ variables: { username, password } });
    if (result) {
      setToken(result.data.login.value);

      //TODO: do not leave token functionality relying on local storage
      localStorage.setItem("LoginToken", result.data.login.value);
      navigate("/");
    }
    //TODO: if !result, credentials incorrect, throw notification
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  let allGenres = [];
  const getAllGenres = (library) => {
    let result = new Set();
    for (let i = 0; i < library.length; i++) {
      library[i].genres.forEach((genre) => {
        result.add(genre);
      });
    }

    result.add("All");
    return (allGenres = Array.from(result));
  };

  if (booksArray) {
    allGenres = getAllGenres(booksArray);
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
          {token && (
            <Link to="/addBook">
              <Button>Add Book</Button>
            </Link>
          )}
        </ButtonGroup>
        {!token && (
          <Link to="/login">
            <Button
              sx={{ backgroundColor: "white", color: "black", float: "right" }}
              variant="contained"
            >
              Login
            </Button>
          </Link>
        )}

        {token && (
          <Button
            onClick={handleLogout}
            sx={{ backgroundColor: "red", float: "right" }}
            variant="contained"
          >
            Logout
          </Button>
        )}
      </header>

      <Routes>
        {!token && (
          <Route
            path="/login"
            element={<Login loginHandler={loginHandler} />}
          />
        )}

        {token && <Route path="/login" element={null} />}

        {/* If user is logged in, they can update the author's birthday */}
        <Route
          path="/"
          element={
            <Authors
              token={token}
              updateAuthor={updateAuthor}
              show={true}
              authors={authorArray}
            />
          }
        />

        {/* Show books regardless of login status */}
        <Route
          path="/books"
          element={<Books show={true} books={booksArray} genres={allGenres} />}
        />

        {/* If user is logged in, show addBook functionality */}
        {!token && <Route path="/addBook" element={null} />}
        {token && (
          <Route
            path="/addBook"
            element={
              <NewBook token={token} createBook={createBook} show={true} />
            }
          />
        )}
      </Routes>
    </>
  );
};

export default App;
