import React, { useEffect } from "react";
import "../designs/card.css";
import Rating from "./Rating";
import { saveState } from "../localStorage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Card(props) {
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: props,
    });
  };

  useEffect(() => {
    saveState(basket);
  }, [basket]);

  return (
    <div className="product">
      <div className="card text-center carding" style={{ width: "18rem" }}>
        <Link to={`/product/${props._id}`}>
          <img src={props.src} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.p}</p>
          <div className="product_rating">
            <div>
              <small style={{ color: " #256eff" }}>₹</small>
              <strong style={{ color: " #256eff" }}>{props.price} </strong>
            </div>
            <Rating star={props.star} />
          </div>
          <a href={props.a} className="btn btn-primary card-buy">
            Buy
          </a>
          <a className="btn btn-primary card-add" onClick={addToBasket}>
            Add to Basket
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
