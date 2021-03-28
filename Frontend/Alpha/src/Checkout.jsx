import React from "react";
import CheckoutProduct from "./components/CheckoutProduct";
import Subtotal from "./components/Subtotal";
import "./designs/checkout.css";
import { useStateValue } from "./StateProvider";

function Checkout() {
  //pulling data from the basket
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        {/* <img
          className="checkout__ad"
          src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/118773619_183383876634266_1930185450502857652_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=axl0qrT6C58AX8-t7Pf&ccb=7-4&oh=cded013e8405af9bb8654da80fc62d8e&oe=60871CA4&_nc_sid=4f375e"
        /> */}
        <div>
          <h2 className="checkout__title">Shopping Basket</h2>
          {basket.map((individualCard) => (
            <CheckoutProduct
              key={individualCard.id}
              id={individualCard.id}
              src={individualCard.src}
              title={individualCard.title}
              p={individualCard.p}
              a={individualCard.a}
              price={individualCard.price}
              star={individualCard.star}
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
