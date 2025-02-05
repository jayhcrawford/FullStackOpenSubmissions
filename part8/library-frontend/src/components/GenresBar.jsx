import React from "react";
import { Button } from "@mui/material";

const GenresBar = (props) => {
  if (!props.genres) {
    return null;
  }

  const handleClick = (filter) => {
    props.setFilter(filter);
  };

  const handleGraphQLFilter = async (filter) => {
    if (filter.toLowerCase() == "all") {
      props.setFilteredBooks(null);
      props.setFilter(filter);
    } else {
      const filterResult = await props.filterGenre({
        variables: {
          genre: filter,
        },
      });

      if (Object.hasOwn(filterResult, "data")) {
        props.setFilteredBooks(filterResult.data.genreFilter);
        props.setFilter(filter);
      }
    }
  };

  return (
    <div style={{ margin: "1em" }}>
      Genres:{" "}
      {props.genres.map((genre) => {
        const buttonColor = () => {
          return props.filter == genre ? "lightgrey" : "white";
        };
        return (
          <Button
            sx={{
              margin: ".3em",
              color: "black",
              borderColor: "black",
              backgroundColor: buttonColor,
            }}
            key={genre}
            variant={props.filter == genre ? "contained" : "outlined"}
            onClick={() => handleGraphQLFilter(genre)}
          >
            {genre}
          </Button>
        );
      })}
    </div>
  );
};

export default GenresBar;
