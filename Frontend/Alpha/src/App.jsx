import React, { Fragment } from "react";
import "./registration/fontawesome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Checkout from "./Checkout";
import Regis from "./registration/Regis";
import Singlecard from "./Singlecard";
import Footer from "./components/Footer";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import PlaceOrder from "./components/PlaceOrder";
import Ordered from "./components/Ordered";
import OrderHistory from "./components/OrderHistory";
import ProfileUpdate from "./registration/ProfileUpdate";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ForgotPassword from "./registration/ForgotPassword";
import AddProduct from "./components/AddProduct";
import Filters from "./components/Filters";
import SeachPage from "./components/SeachPage";

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

          <PrivateRoute
            path="/profileup"
            component={ProfileUpdate}
          ></PrivateRoute>

          <AdminRoute
            exact
            path="/addproduct"
            component={AddProduct}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/editproduct/:id"
            component={AddProduct}
          ></AdminRoute>

          <Route path="/reset/:id/:token">
            <ForgotPassword />
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

          <Route path="/orderhistory">
            <Navbar />
            <OrderHistory />
            <Footer />
          </Route>

          <Route path="/search">
            <Navbar />
            <SeachPage />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
