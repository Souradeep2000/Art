import React from "react";
import "./registration/fontawesome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Checkout from "./Checkout";
import Regis from "./registration/Regis";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/checkout">
            <Navbar />

            <Checkout />
          </Route>

          <Route path="/sign">
            <Regis />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
