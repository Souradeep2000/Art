import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { loadState } from "./localStorage";
import { cartDetailsReducer } from "./reducers/cartReducers";
import {
  userDetailsReducer,
  userForgetPasswordReducer,
  userNewPasswordReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListItemsReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  commentListReducer,
  commentPostReducer,
} from "./reducers/commentReducers";
import {
  searchInputReducer,
  searchListReducer,
} from "./reducers/searchReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },

  productCart: {
    basket: loadState(),
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCart: cartDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListItems: orderListItemsReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userForgetPassword: userForgetPasswordReducer,
  userNewPassword: userNewPasswordReducer,
  commentPost: commentPostReducer,
  commentList: commentListReducer,
  searchList: searchListReducer,
  inputSearch: searchInputReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
