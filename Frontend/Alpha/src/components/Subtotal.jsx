import React from "react";
import "../designs/subtotal.css";
import CurrencyFormat from "react-currency-format";
// import { useStateValue } from "../StateProvider";
// import { getBasketTotal } from "../reducer";

function Subtotal(props) {
  //const [{ basket }, dispatch] = useStateValue();
  const getTotalPrice = () => {
    let total = 0;
    props.cartItems.forEach((item) => {
      total += item.card.price * item.card.quantity;
    });
    return total;
  };

  const getCount = () => {
    let count = 0;
    props.cartItems.forEach((item) => {
      count += item.card.quantity;
    });
    return count;
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getCount()} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} //price show upto two decimal scale
        value={getTotalPrice()} //current parsed in money
        displayType={"text"}
        thousandSeparator={true} //if cart is in thousand then show thousand coma
        prefix={"₹"}
      />
      <button className="proceed">Proceed to Buy</button>
    </div>
  );
}

export default Subtotal;
