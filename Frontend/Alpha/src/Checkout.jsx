import React, { useState, useEffect } from "react";
import CheckoutProduct from "./components/CheckoutProduct";
import Subtotal from "./components/Subtotal";
import "./designs/checkout.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";

function Checkout() {
  //pulling data from the basket
  //const [{ basket }, dispatch] = useStateValue();
  const [cartItems, Setcartitems] = useState([]);
  const getCartItems = () => {
    db.collection("cartItems").onSnapshot((snapshot) => {
      const tempItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        card: doc.data(),
      }));
      Setcartitems(tempItems);
    });
  };
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div>
          <h2 className="checkout__title">Shopping Basket</h2>
          {cartItems.map((individualCard) => (
            <CheckoutProduct
              key={individualCard.id}
              id={individualCard.id}
              src={individualCard.card.src}
              title={individualCard.card.title}
              p={individualCard.card.p}
              a={individualCard.card.a}
              price={individualCard.card.price}
              star={individualCard.card.star}
              quantity={individualCard.card.quantity}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal cartItems={cartItems} />
      </div>
    </div>
  );
}

export default Checkout;
