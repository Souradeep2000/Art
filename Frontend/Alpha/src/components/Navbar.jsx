import React from "react";
import Dropdown from "./Dropdown";
import Badge from "./Badge";
import Searchbar from "./Searchbar";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "../designs/navbar.css";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { signout } from "../actions/userActions";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CreateIcon from "@material-ui/icons/Create";

function Navbar() {
  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const getCount = () => {
    let count = 0;
    basket.forEach((item) => {
      count += item.qty;
    });
    return count;
  };

  const signoutHandler = () => {
    dispatch(signout());
    location.reload();
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
        {userInfo ? (
          <div className="nav-item profile">
            <Link to="#">
              <PersonOutlineIcon className="PersonOutlineIcon" />{" "}
              {userInfo.name}
              <ArrowDropDownCircleOutlinedIcon className="ArrowDropDownCircleOutlinedIcon" />
            </Link>
            <ul className="profile-content" style={{ listStyleType: "none" }}>
              <li>
                <Link to="/orderhistory">
                  <CardGiftcardIcon /> Orders
                </Link>
              </li>

              <li>
                <Link to="/profileup">
                  <PersonOutlineIcon /> My Profile
                </Link>
              </li>
              <li>
                <Link to="#signout" onClick={signoutHandler}>
                  <ExitToAppRoundedIcon /> Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="nav-item profile">
            <Link to="/sign">
              Login <PersonOutlineIcon className="PersonOutlineIcon" />
            </Link>
          </div>
        )}

        {userInfo && userInfo.isAdmin && (
          <div className="nav-item profile">
            <Link to="#admin">
              <VerifiedUserIcon className="VerifiedUserIcon" />
              ADMIN
              <ArrowDropDownCircleOutlinedIcon className="ArrowDropDownCircleOutlinedIcon" />
            </Link>
            <ul className="profile-content" style={{ listStyleType: "none" }}>
              <li>
                <Link to="/dashboard">
                  <CreateIcon /> Dashboard
                </Link>
              </li>

              <li>
                <Link to="/addproduct">
                  <PersonOutlineIcon /> Products
                </Link>
              </li>
              <li>
                <Link to="/userlist">
                  <ContactPhoneIcon /> Users
                </Link>
              </li>
            </ul>
          </div>
        )}
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
