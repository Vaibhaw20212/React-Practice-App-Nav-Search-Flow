import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography} from "@mui/material";

function Navbar() {
  const history = useHistory();

  const [location, setLocation] = React.useState("/");

  return (
    <AppBar position="static" color="secondary">
      <Toolbar className="flex justify-between">
        <Typography
          variant="h6"
          className="cursor-pointer"
          onClick={() => history.push("/")}
        >
          My PokeApp
        </Typography>

        <div className="flex gap-4">
          <Button
            color={location.pathname === "/" ? "primary" : "inherit"}
            variant={location.pathname === "/" ? "outlined" : "text"}
            onClick={() => {
              history.push("/");
              setLocation("/");
            }}
          >
            Searcher
          </Button>
          <Button
            color={location.pathname === "/playground" ? "primary" : "inherit"}
            variant={location.pathname === "/playground" ? "outlined" : "text"}
            onClick={() => {
              history.push("/playground");
              setLocation("/playground");
            }}
          >
            Playground
          </Button>
          <Button
            color={location.pathname === "/bitcoin-chart" ? "primary" : "inherit"}
            variant={location.pathname === "/bitcoin-chart" ? "outlined" : "text"}
            onClick={() => {
              history.push("/bitcoin-chart");
              setLocation("/bitcoin-chart");
            }}
          >
            Bitcoin Chart
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );

  
}

export default Navbar;
