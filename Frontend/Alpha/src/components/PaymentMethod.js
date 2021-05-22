import React, { useState } from "react";
import "../designs/paymentMethod.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../actions/shippingActions";
import CheckoutSteps from "./CheckoutSteps";
import PaymentIcon from "@material-ui/icons/Payment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  let history = useHistory();

  const productCart = useSelector((state) => state.productCart);
  const { shippingAddress } = productCart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="payment-form" onSubmit={submitHandler}>
        <div className="payment-container">
          <div className="payment-text">
            <h1>
              Payment Method <PaymentIcon className="payment-icon" />
            </h1>
          </div>
          <div>
            <div className="payment-div">
              <input
                type="radio"
                id="paypal"
                value="PayPal"
                name="paymentMethod"
                required
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="paypal">
                <FontAwesomeIcon icon={["fab", "paypal"]} />
                PayPal
              </label>
            </div>

            <div className="payment-div">
              <input
                type="radio"
                id="stripe"
                value="Stripe"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="stripe">Stripe</label>
            </div>

            <div className="payment-div">
              <button className="primary pay-but" type="submit">
                Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethod;
