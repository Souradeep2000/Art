import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Badge from "./Badge";
import Searchbar from "./Searchbar";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";

function Navbar() {
  //const [{ basket }, dispatch] = useStateValue();
  const [cartItems, Setcartitems] = useState([]);
  const getCartItems = () => {
    db.collection("cartItems").onSnapshot((snapshot) => {
      const tempItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        card: doc.data(),
      }));
      Setcartitems(tempItems);
    });
  };
  useEffect(() => {
    getCartItems();
  }, []);

  const getCount = () => {
    let count = 0;
    console.log(cartItems);
    cartItems.forEach((item) => {
      count += item.card.quantity;
    });
    return count;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Badge />
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <Dropdown />
        </ul>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Searchbar />
          </li>
        </ul>

        <div className="nav-item profile">profile</div>
      </div>
      <Link to="/checkout">
        <div className="cart">
          <ShoppingBasketIcon />
          <span className="basketCount">{getCount()}</span>
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
