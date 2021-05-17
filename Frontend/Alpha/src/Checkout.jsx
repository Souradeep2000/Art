import React, { useEffect } from "react";
import CheckoutProduct from "./components/CheckoutProduct";
import Subtotal from "./components/Subtotal";
import "./designs/checkout.css";
//import { useStateValue } from "./StateProvider";
// import { db } from "./firebase";
import { saveState } from "./localStorage";
import { useSelector } from "react-redux";

function Checkout() {
  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  //const [{ basket }, dispatch] = useStateValue();
  useEffect(() => {
    saveState(basket);
  }, [basket]);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div>
          <h2 className="checkout__title">Shopping Basket</h2>
          {basket.map((individualCard) => (
            <CheckoutProduct
              key={individualCard._id}
              _id={individualCard._id}
              src={individualCard.src}
              title={individualCard.title}
              p={individualCard.p}
              a={individualCard.a}
              price={individualCard.price}
              star={individualCard.star}
              quantity={individualCard.qty}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
