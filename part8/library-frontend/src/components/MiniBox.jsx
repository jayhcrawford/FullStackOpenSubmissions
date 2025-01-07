import * as React from "react";
import { Paper } from "@mui/material";

export default function MiniBox(props) {
  return (
    <div style={{ padding: "2em", display: "block", width: '25em'}}>
      <Paper
        style={{
          padding: "2em",
          display: "block",
          width: "20em",
          backgroundColor: "white",
        }}
        elevation={5}
      >
        {props.children}
      </Paper>
    </div>
  );
}
