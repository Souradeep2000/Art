import React from "react";
import "./registration/fontawesome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Checkout from "./Checkout";
import Regis from "./registration/Regis";
//import reducer, { initialState } from "./reducer";
import Singlecard from "./Singlecard";
import Footer from "./components/Footer";
import store from "./store";

function App() {
  return (
    // <Provider store={store}>
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

          <Route exact path="/:id">
            <Navbar />
            <Singlecard />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
    // </Provider>
  );
}

export default App;
