import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  useMutation,
  useQuery,
  useApolloClient,
  useSubscription,
} from "@apollo/client";
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  CREATE_BOOK,
  UPDATE_AUTHOR,
  LOGIN,
  UPDATE_FAV_GENRE,
  GENRE_FILTER_BOOKS,
  BOOK_ADDED,
} from "./queries/queries";

import { Button, ButtonGroup } from "@mui/material";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import Notification from "./components/Notification";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      console.log(item)
      let k = item.title;
      return seen.has(k) ? false : seen.add(item);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  //console.trace()
  const books = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);
  const [token, setToken] = useState(null);
  const [visibleNotification, setVisibleNotification] = useState({
    visible: false,
    message: null,
  });

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      if (Object.hasOwn(data.data, "bookAdded")) {
        createNotification(data.data.bookAdded);
      }
      updateCache(client.cache, { query: ALL_BOOKS }, data.data.bookAdded);
    },
  });

  if (typeof token == "string") {
    setToken(JSON.parse(token));
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("LoginToken")) {
      setToken(localStorage.getItem("LoginToken"));
    }
  }, []);

  const [filterGenre] = useMutation(GENRE_FILTER_BOOKS);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addPerson);
    },
  });

  const [updateFavGenre] = useMutation(UPDATE_FAV_GENRE);

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
      setToken(result.data.login);

      //TODO: do not leave token functionality relying on local storage
      localStorage.setItem("LoginToken", JSON.stringify(result.data.login));
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

  const createNotification = (book) => {
    console.log(book);
    setVisibleNotification({
      visible: true,
      message: book.title,
    });

    setTimeout(() => {
      setVisibleNotification({
        visible: false,
        message: null,
      });
    }, 20000);
  };

  return (
    <>
      <Notification
        visibleNotification={visibleNotification}
        setVisibleNotification={setVisibleNotification}
      />
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
            <>
              <Link to="/addBook">
                <Button>Add Book</Button>
              </Link>
            </>
          )}
          {token && (
            <>
              <Link to="/recommend">
                <Button>Recommendations</Button>
              </Link>
            </>
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
          element={
            <Books
              filterGenre={filterGenre}
              show={true}
              books={booksArray}
              genres={allGenres}
            />
          }
        />

        <Route
          path="/recommend"
          element={
            <Recommendations
              show={true}
              books={booksArray}
              genres={allGenres}
              token={token}
              updateFavGenre={updateFavGenre}
              setToken={setToken}
              filterGenre={filterGenre}
            />
          }
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
