import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { Link, useHistory } from "react-router-dom";
import "../designs/placeOrder.css";
import PaymentIcon from "@material-ui/icons/Payment";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingDiv from "./LoadingDiv";
import MessageDiv from "./MessageDiv";

function PlaceOrder() {
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.productCart);

  let history = useHistory();

  if (!productCart.paymentMethod) {
    history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);

  const roundPrice = (num) => Number(num.toFixed(2));
  productCart.itemsPrice = roundPrice(
    productCart.basket.reduce(
      (accumulator, current) => accumulator + current.qty * current.price,
      0
    )
  );

  productCart.shippingPrice =
    productCart.itemsPrice > 349 ? roundPrice(0) : roundPrice(40);
  productCart.taxPrice = roundPrice(0.049 * productCart.itemsPrice);

  productCart.totalPrice =
    productCart.itemsPrice + productCart.shippingPrice + productCart.taxPrice;

  // if (productCart.totalPrice > 349) {
  //   productCart.totalPrice = productCart.totalPrice - productCart.shippingPrice;
  // }
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...productCart, orderItems: productCart.basket }));
  };

  useEffect(() => {
    if (orderCreate.success) {
      history.push(`/order/${orderCreate.order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, orderCreate.success, history, orderCreate.order]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-lg-8 order-col">
          <ul>
            <li>
              <div className="card card-body kutu">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>
                  {productCart.shippingAddress.fullName}
                  <br />
                  <strong>Address:</strong>
                  {productCart.shippingAddress.address},
                  {productCart.shippingAddress.city},
                  {productCart.shippingAddress.postalCode},
                  {productCart.shippingAddress.country}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body kutu">
                <h2>
                  Payment <PaymentIcon className="payment-icon" />
                </h2>
                <p>
                  <strong>Method:</strong> {(" ", productCart.paymentMethod)}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body kutu">
                <h2>Order Items</h2>
                <ul>
                  {productCart.basket.map((item) => (
                    <li key={item.title}>
                      <div className="row">
                        <div className="col-lg-4 col-sm-6">
                          <Link to={`/product/${item._id}`}>
                            <img
                              src={item.src}
                              alt={item.title}
                              className="small"
                            ></img>
                          </Link>
                        </div>
                        <div className=" col-lg-4 col-sm-6 order-title">
                          {item.title}
                        </div>
                        <div className="col-lg-4 col-sm-6 order-price">
                          {item.qty} x ₹{item.price}={item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="order-subtotal col-lg-4">
          <div className="card card-body kutu">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div className="col-lg-8 col-sm-3 ">Items:</div>
                  <div className="col-lg-4  col-sm-9">
                    ₹{productCart.itemsPrice.toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-lg-8 col-sm-3 ">Shipping:</div>
                  <div
                    className={`col-lg-4  col-sm-9 ${
                      productCart.shippingPrice === 0
                        ? "order-price"
                        : "order-golpo"
                    }`}
                  >
                    ₹{productCart.shippingPrice.toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-lg-8  col-sm-3">Tax:</div>
                  <div className="col-lg-4  col-sm-9">
                    ₹{productCart.taxPrice.toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-lg-8 col-sm-3">
                    <strong>Order Total:</strong>
                  </div>
                  <div className="order-price col-lg-4 col-sm-9">
                    ₹{productCart.totalPrice.toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="order-but">
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="primary transparent"
                    disabled={productCart.basket.length === 0}
                  >
                    Place Order
                  </button>
                </div>
              </li>
              {orderCreate.loading && <LoadingDiv />}
              {orderCreate.error && (
                <MessageDiv status="danger">{orderCreate.error}</MessageDiv>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
