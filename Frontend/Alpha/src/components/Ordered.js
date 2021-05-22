import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { Link, useHistory, useParams } from "react-router-dom";
import "../designs/placeOrder.css";
import PaymentIcon from "@material-ui/icons/Payment";
import { detailsOrder } from "../actions/orderActions";
import LoadingDiv from "./LoadingDiv";
import MessageDiv from "./MessageDiv";

function Ordered() {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  let history = useHistory();

  const { id } = useParams();
  const orderId = id;

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

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
              <h2>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ordered;
