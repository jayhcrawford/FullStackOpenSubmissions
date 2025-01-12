import React from "react";
import { Button } from "@mui/material";

const GenresBar = (props) => {
  if (!props.genres) {
    return null;
  }

  const handleClick = (filter) => {
    props.setFilter(filter);
  };

  return (
    <div style={{ margin: "1em" }}>
      Genres:{" "}
      {props.genres.map((genre) => {
        return (
          <Button
            sx={{ margin: ".3em", color: "black", borderColor: "black" }}
            key={genre}
            variant="outlined"
            onClick={() => handleClick(genre)}
          >
            {genre}
          </Button>
        );
      })}
    </div>
  );
};

export default GenresBar;
