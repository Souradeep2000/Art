import React, { useEffect } from "react";
import "../designs/orderHistory.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listOrderItems } from "../actions/orderActions";
import LoadingDiv from "./LoadingDiv";
import MessageDiv from "./MessageDiv";

function OrderHistory() {
  const orderListItems = useSelector((state) => state.orderListItems);
  const { loading, error, orders } = orderListItems;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderItems());
  }, [dispatch]);

  let history = useHistory();
  return (
    <div className="your-order">
      <div className="order-h1">
        <h1>Order History</h1>
      </div>

      {loading ? (
        <LoadingDiv />
      ) : error ? (
        <MessageDiv status="danger">{error}</MessageDiv>
      ) : (
        <div className="order-history">
          <ul>
            {orders
              .slice(0)
              .reverse()
              .map((order) => (
                <li key={order._id}>
                  <div className="order-box">
                    <div className="row">
                      <div className="col-4">
                        <div className="row">
                          {order.orderItems.map((item) => (
                            <div key={item.title} className="col">
                              <Link to={`/product/${item._id}`}>
                                <img src={item.src} className="order-image" />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-8">
                        <div className="row history">
                          <div className="col-lg-2">
                            Ordered on {order.createdAt.substring(0, 10)}
                          </div>
                          <div className="col-lg-2">{order.totalPrice}</div>
                          <div className="col-lg-2">
                            {order.isPaid
                              ? order.paidAt.substring(0, 10)
                              : "Not Paid"}
                          </div>
                          <div className="col-lg-2">
                            {order.isDelivered
                              ? order.isDelivered.substring(0, 10)
                              : "Not Delivered"}
                          </div>
                          <div className="col-lg-2 order-but">
                            <button
                              type="button"
                              className="more_details"
                              onClick={() => {
                                history.push(`/order/${order._id}`);
                              }}
                            >
                              More Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
