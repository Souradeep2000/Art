import React from "react";
import Dropdown from "./Dropdown";
import Badge from "./Badge";
import Searchbar from "./Searchbar";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
// import { useStateValue } from "../StateProvider";
//import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { signout } from "../actions/userActions";

function Navbar() {
  //const [{ basket }] = useStateValue();
  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;
  // const [cartItems, Setcartitems] = useState([]);
  // const getCartItems = () => {
  //   db.collection("cartItems").onSnapshot((snapshot) => {
  //     const tempItems = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       card: doc.data(),
  //     }));
  //     Setcartitems(tempItems);
  //   });
  // };
  // useEffect(() => {
  //   getCartItems();
  // }, []);
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
              {userInfo.name}
              <ArrowDropDownCircleOutlinedIcon className="ArrowDropDownCircleOutlinedIcon" />
            </Link>
            <ul className="profile-content">
              <Link to="#signout" onClick={signoutHandler}>
                <ExitToAppRoundedIcon /> Sign Out
              </Link>
            </ul>
          </div>
        ) : (
          <div className="nav-item profile">
            <Link to="/sign">
              Login <PersonOutlineIcon className="PersonOutlineIcon" />
            </Link>
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
