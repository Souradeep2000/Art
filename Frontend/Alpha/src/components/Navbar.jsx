import React from "react";
import Dropdown from "./Dropdown";
import Badge from "./Badge";
import Searchbar from "./Searchbar";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

function Navbar() {
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
      
        <div className="nav-item profile">
        <PermIdentityIcon/> 
        </div>
      </div>
      <Link to="/checkout">
        <div className="cart">
          <ShoppingBasketIcon />
          <span className="basketCount">0</span>
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
