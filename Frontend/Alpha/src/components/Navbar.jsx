import React, { useState } from "react";
import "../designs/navbar.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { signout } from "../actions/userActions";
import { searchInput } from "../actions/searchAction";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [profDown, setProfDown] = useState(false);
  const [adminDown, setAdminDown] = useState(false);

  const [search, setSearch] = useState("");

  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

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

  const handleSearch = () => {
    dispatch(searchInput(search));
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const showProfDown = () => {
    setProfDown(!profDown);
  };
  const showAdminDown = () => {
    setAdminDown(!adminDown);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="nav-bar">
          <div className="left-bar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <div className="nav-brand">
              <Link to="/">Art Aficionado</Link>
            </div>
          </div>

          <div className="searchBox">
            <form className="search-form">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <Link to="/search" style={{ paddingTop: 10 }}>
                <button className="search-button" onClick={handleSearch}>
                  <SearchIcon />
                </button>
              </Link>
            </form>
          </div>

          <div className="right-bar">
            {userInfo ? (
              <div className="nav-bar-profile">
                <Link to="#">
                  <PersonOutlineIcon className="PersonOutlineIcon" />
                  {userInfo.name}
                </Link>
              </div>
            ) : (
              <div className="nav-bar-profile">
                <Link to="/sign">
                  <span> Login </span>
                  <PersonOutlineIcon className="PersonOutlineIcon" />
                </Link>
              </div>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="nav-bar-admin">
                <Link to="#admin">
                  <VerifiedUserIcon className="VerifiedUserIcon" />
                  <span> ADMIN</span>
                </Link>
              </div>
            )}

            <div className="cart">
              <Link to="/checkout">
                <ShoppingBasketIcon />
                <span className="basketCount">{getCount()}</span>
              </Link>
            </div>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle" onClick={showSidebar}>
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/">
                <AiIcons.AiFillHome />
                <span>Home</span>
              </Link>
            </li>

            {userInfo ? (
              <>
                <li className="nav-text" onClick={showProfDown}>
                  <Link to="#">
                    <PersonOutlineIcon />
                    {userInfo.name}
                  </Link>
                </li>
                {profDown && (
                  <>
                    <li className="nav-text">
                      <Link to="/orderhistory">
                        <CardGiftcardIcon style={{ color: "pink" }} />
                        <span style={{ fontFamily: "monospace" }}> Orders</span>
                      </Link>
                    </li>

                    <li className="nav-text">
                      <Link to="/profileup">
                        <PersonOutlineIcon style={{ color: "#007bff" }} />
                        <span style={{ fontFamily: "monospace" }}>
                          My Profile
                        </span>
                      </Link>
                    </li>
                    <li className="nav-text">
                      <Link to="#signout" onClick={signoutHandler}>
                        <ExitToAppRoundedIcon style={{ color: "red" }} />
                        <span style={{ fontFamily: "monospace" }}>
                          Sign Out
                        </span>
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <li className="nav-text">
                <Link to="/sign">
                  <PersonOutlineIcon />
                  <span> Login </span>
                </Link>
              </li>
            )}

            {userInfo && userInfo.isAdmin && (
              <>
                <li className="nav-text" onClick={showAdminDown}>
                  <Link to="#admin">
                    <VerifiedUserIcon className="VerifiedUserIcon" />
                    <span> ADMIN</span>
                  </Link>
                </li>
                {adminDown && (
                  <>
                    <li className="nav-text">
                      <Link to="/dashboard">
                        <CreateIcon />
                        <span style={{ fontFamily: "monospace" }}>
                          Dashboard
                        </span>
                      </Link>
                    </li>
                    <li className="nav-text">
                      <Link to="/addproduct">
                        <PersonOutlineIcon />
                        <span style={{ fontFamily: "monospace" }}>
                          Products
                        </span>
                      </Link>
                    </li>
                    <li className="nav-text">
                      <Link to="/userlist">
                        <ContactPhoneIcon />
                        <span style={{ fontFamily: "monospace" }}>Users</span>
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
