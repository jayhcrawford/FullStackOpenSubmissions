import MiniBox from "./MiniBox";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";

const Login = (props) => {
  return (
    <MiniBox>
      <form onSubmit={props.loginHandler}>
        {" "}
        <Grid container>
          <Grid size={12}>
            username
            <TextField
              // value={name} instead of this line write below line
              labelid="usernameInput"
              name="usernameInput"
              style={{ width: "100%" }}
            ></TextField>
          </Grid>{" "}
          <Grid size={12}>
            password
            <TextField
              // value={name} instead of this line write below line
              labelid="passwordInput"
              type="password"
              name="passwordInput"
              style={{ width: "100%" }}
            ></TextField>
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "grey" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </MiniBox>
  );
};

export default Login;
