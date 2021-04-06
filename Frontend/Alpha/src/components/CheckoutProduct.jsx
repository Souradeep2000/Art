import React, { useEffect } from "react";
import "../designs/checkoutProduct.css";
import { useStateValue } from "../StateProvider";
import Rating from "./Rating";
import { db } from "../firebase";
import { saveState } from "../localStorage";

function CheckoutProduct(props) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: props.id,
    });
  };
  useEffect(() => {
    saveState(basket);
  }, [basket]);

  let options = [];
  for (let i = 1; i < Math.max(props.quantity + 1, 10); i++) {
    options.push(<option value={i}>Qty:{i}</option>);
  }

  const adjustQty = (newQty) => {
    dispatch({
      type: "ADJUST_QTY",
      item: {
        id: props.id,
        qty: parseInt(newQty),
      },
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={props.src} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">
          {props.title}
          <br />
          {props.p}
        </p>

        <p className="checkoutProduct__price">
          <div>
            <small style={{ color: " #256eff" }}>₹</small>
            <strong style={{ color: " #256eff" }}>{props.price}</strong>
          </div>

          <div className="checkoutProduct__qty">
            <select
              value={props.quantity}
              onChange={(event) => adjustQty(event.target.value)}
            >
              {options}
            </select>
          </div>
        </p>
        <Rating star={props.star} />
        <a className="btn btn-primary card-add" onClick={removeFromBasket}>
          Remove from Basket
        </a>
      </div>
    </div>
  );
}

export default CheckoutProduct;
