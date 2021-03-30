import React from "react";
import "../designs/checkoutProduct.css";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";

function CheckoutProduct(props) {
  // const [{ basket }, dispatch] = useStateValue();

  // const removeFromBasket = () => {
  //   dispatch({
  //     type: "REMOVE_FROM_BASKET",
  //     id: props.id,
  //   });
  // };
  //console.log(props.id);
  const removeFromBasket = (event) => {
    event.preventDefault();
    db.collection("cartItems").doc(props.id).delete();
  };

  let options = [];
  for (let i = 1; i < Math.max(props.quantity + 1, 10); i++) {
    options.push(<option value={i}>Qty:{i}</option>);
  }
  const changeQuanity = (newQty) => {
    db.collection("cartItems")
      .doc(props.id)
      .update({
        quantity: parseInt(newQty),
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
            <small>₹</small>
            <strong>{props.price}</strong>
          </div>

          <div className="checkoutProduct__qty">
            <select
              value={props.quantity}
              onChange={(event) => changeQuanity(event.target.value)}
            >
              {options}
            </select>
          </div>
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
