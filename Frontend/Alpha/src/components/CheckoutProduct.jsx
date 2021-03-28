import React from "react";
import "../designs/checkoutProduct.css";
import { useStateValue } from "../StateProvider";

function CheckoutProduct(props) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: props.id,
    });
  };
  console.log(props.id);
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
          <small>₹</small>
          <strong>{props.price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(props.star)
            .fill()
            .map((star) => (
              <p>⭐</p>
            ))}
        </div>
        <a className="btn btn-primary card-add" onClick={removeFromBasket}>
          Remove from Basket
        </a>
      </div>
    </div>
  );
}

export default CheckoutProduct;
