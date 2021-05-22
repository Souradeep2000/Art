import React from "react";
import "./registration/fontawesome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { Provider } from "react-redux";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Checkout from "./Checkout";
import Regis from "./registration/Regis";
//import reducer, { initialState } from "./reducer";
import Singlecard from "./Singlecard";
import Footer from "./components/Footer";
//import store from "./store";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import PlaceOrder from "./components/PlaceOrder";
import Ordered from "./components/Ordered";

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

          <Route path="/product/:id">
            <Navbar />
            <Singlecard />
            <Footer />
          </Route>

          <Route path="/shipping">
            <Navbar />
            <ShippingAddress />
            <Footer />
          </Route>

          <Route path="/payment">
            <Navbar />
            <PaymentMethod />
            <Footer />
          </Route>

          <Route path="/placeorder">
            <Navbar />
            <PlaceOrder />
            <Footer />
          </Route>

          <Route path="/order/:id">
            <Navbar />
            <Ordered />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
