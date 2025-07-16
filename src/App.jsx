import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playground from "./pages/Playground";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/playground" component={Playground} />
      </Switch>
    </HashRouter>
  );
}


export default App;
