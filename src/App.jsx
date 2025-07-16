import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import BitcoinChartPage from "./pages/BitcoinChartPage";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/playground" component={Playground} />
        <Route path="/bitcoin-chart" component={BitcoinChartPage} />
      </Switch>
    </HashRouter>
  );
}

export default App;
