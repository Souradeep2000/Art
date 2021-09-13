import React from "react";
import "../designs/subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function Subtotal() {
  let history = useHistory();

  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  const getTotalPrice = () => {
    let total = 0;
    basket.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  };

  const getCount = () => {
    let count = 0;
    basket.forEach((item) => {
      count += item.qty;
    });
    return count;
  };

  const checkoutHandler = () => {
    history.push("/sign?redirect=shipping");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getCount()} items):
              <strong style={{ color: " #20a020" }}>{value}</strong>
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
      <button
        type="button"
        onClick={checkoutHandler}
        className="proceed"
        disabled={getCount() === 0}
      >
        Proceed to Buy
      </button>
    </div>
  );
}

export default Subtotal;
