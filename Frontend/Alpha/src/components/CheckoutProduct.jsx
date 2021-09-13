import React, { useEffect } from "react";
import "../designs/checkoutProduct.css";
import Rating from "./Rating";
import { saveState } from "../localStorage";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CheckoutProduct(props) {
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      _id: props._id,
    });
  };
  useEffect(() => {
    saveState(basket);
  }, [basket]);

  let options = [];
  for (let i = 1; i < Math.max(props.quantity + 1, 6); i++) {
    options.push(
      <option key={i} value={i}>
        Qty:{i}
      </option>
    );
  }

  const adjustQty = (newQty) => {
    dispatch({
      type: "ADJUST_QTY",
      item: {
        _id: props._id,
        qty: parseInt(newQty),
      },
    });
  };
  return (
    <div className="checkoutProduct">
      <Link to={`/product/${props._id}`}>
        <img className="checkoutProduct__image" src={props.src} />
      </Link>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{props.title}</p>

        <div className="checkoutProduct__price">
          <div>
            <small style={{ color: " #20a020" }}>₹</small>
            <strong style={{ color: " #20a020" }}>{props.price}</strong>
          </div>

          <div className="checkoutProduct__qty">
            <select
              value={props.quantity}
              onChange={(event) => adjustQty(event.target.value)}
            >
              {options}
            </select>
          </div>
        </div>
        <Rating star={props.star / props.numReviews} />
        <a className="btn btn-primary card-add" onClick={removeFromBasket}>
          Remove from Basket
        </a>
      </div>
    </div>
  );
}

export default CheckoutProduct;
