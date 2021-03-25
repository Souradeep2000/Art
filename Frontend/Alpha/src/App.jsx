import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Checkout from "./Checkout";

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
