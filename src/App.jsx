import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import BitcoinChartPage from "./pages/BitcoinChartPage";

function App() {
  const showPlayground = useSelector((state) => state.nav.showPlayground);
  const showBitcoin = useSelector((state) => state.nav.showBitcoin);
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        {showPlayground ? (
          <Route path="/playground" component={Playground} />
        ) : null}
        {showBitcoin ? (
          <Route path="/bitcoin-chart" component={BitcoinChartPage} />
        ) : null}
      </Switch>
    </>
  );
}

export default App;
