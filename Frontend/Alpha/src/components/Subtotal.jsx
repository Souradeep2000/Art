import React from "react";
import "../designs/subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} //price show upto two decimal scale
        value={getBasketTotal(basket)} //current parsed in money
        displayType={"text"}
        thousandSeparator={true} //if cart is in thousand then show thousand coma
        prefix={"₹"}
      />
      <button>Proceed to Buy</button>
    </div>
  );
}

export default Subtotal;
