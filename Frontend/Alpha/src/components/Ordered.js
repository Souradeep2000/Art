import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { Link, useHistory, useParams } from "react-router-dom";
import "../designs/placeOrder.css";
import PaymentIcon from "@material-ui/icons/Payment";
import { detailsOrder, payOrder } from "../actions/orderActions";
import LoadingDiv from "./LoadingDiv";
import MessageDiv from "./MessageDiv";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Ordered() {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  let history = useHistory();

  const { id } = useParams();
  const orderId = id;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    error: errorPay,
    success: successPay,
    loading: loadingPay,
  } = orderPay;

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  //razorpay implementation
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const { data } = await axios.post(
      `/razorpay?id=${orderId}&value=${userInfo.token}`
    );

    const { cid } = await axios.get("/api/config/razorpay");

    const options = {
      key: cid,
      currency: data.currency,
      amount: data.amount,
      order_id: data._id,
      name: "Art Aficionado",
      description: "Please do not share your account details with anyone.",
      image: "...",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        successPaymentHandler();
      },
      prefill: {
        name: "Souradeep Gharami",
        email: "souradeepgharami2000@gmail.com",
        phone_number: "9062027362",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=INR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }; //when script is downloaded in this page and ready to use
      document.body.appendChild(script); //added script at the buttom of the body as a last child
    };

    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
      if (successPay) {
        window.location.reload();
      }
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript(); //if i havenot called paypal(not loaded)
        } else {
          setSdkReady(true); //already loaded paypal
        }
      }
    }
  }, [dispatch, orderId, order, sdkReady, successPay]);

  return loading ? (
    <LoadingDiv />
  ) : error ? (
    <MessageDiv status="danger">{error} </MessageDiv>
  ) : (
    <div>
      <div className="row top">
        <div className="col-lg-8 order-col">
          <ul>
            <li>
              <h2 className="order-id">
                <strong>Order-ref:</strong> {order._id}
              </h2>
            </li>
            <li>
              <div className="card card-body kutu">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>
                  {order.shippingAddress.fullName}
                  <br />
                  <strong>Address:</strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageDiv status="success">
                    DeliveredAt at {order.deliveredAt}
                  </MessageDiv>
                ) : (
                  <MessageDiv>Not delivered</MessageDiv>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body kutu">
                <h2>
                  Payment <PaymentIcon className="payment-icon" />
                </h2>
                <p>
                  <strong>Method:</strong> {(" ", order.paymentMethod)}
                </p>
                {order.isPaid ? (
                  <MessageDiv status="success">
                    Paid at {order.paidAt}
                  </MessageDiv>
                ) : (
                  <MessageDiv>Not Paid</MessageDiv>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body kutu">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                    ₹{order.itemsPrice.toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-lg-8 col-sm-3 ">Shipping:</div>
                  <div
                    className={`col-lg-4  col-sm-9 ${
                      order.shippingPrice === 0 ? "order-price" : "order-golpo"
                    }`}
                  >
                    ₹{order.shippingPrice.toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-lg-8  col-sm-3">Tax:</div>
                  <div className="col-lg-4  col-sm-9">
                    ₹{order.taxPrice.toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-lg-8 col-sm-3">
                    <strong>Order Total:</strong>
                  </div>
                  <div className="order-price col-lg-4 col-sm-9">
                    ₹{order.totalPrice.toFixed(2)}
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingDiv></LoadingDiv>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageDiv status="danger">{errorPay}</MessageDiv>
                      )}
                      {loadingPay && <LoadingDiv />}
                      <PayPalButton
                        amount={order.totalPrice}
                        currency="INR"
                        onSuccess={successPaymentHandler}
                      />
                    </>
                  )}
                </li>
              )}

              {!order.isPaid ? (
                <li>
                  <li style={{ display: "flex", justifyContent: "center" }}>
                    <strong>OR</strong>
                  </li>
                  {errorPay && (
                    <MessageDiv status="danger">{errorPay}</MessageDiv>
                  )}
                  {loadingPay && <LoadingDiv />}
                  <div className="order-but">
                    <button id="rzp-button1" onClick={displayRazorpay}>
                      Razor Pay
                    </button>
                  </div>
                </li>
              ) : (
                <div></div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ordered;
