import React from "react";
import "./registration/fontawesome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Checkout from "./Checkout";
import Regis from "./registration/Regis";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import Singlecard from "./Singlecard";
import Footer from "./components/Footer";

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/checkout">
              <Navbar />
              <Checkout />
            </Route>

            <Route exact path="/sign">
              <Regis />
            </Route>

            <Route path="/:id">
              <Navbar />
              <Singlecard />
              <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
