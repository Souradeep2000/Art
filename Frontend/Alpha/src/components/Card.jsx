import React, { useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";
import Rating from "./Rating";
import { saveState, saveOneProduct } from "../localStorage";
import { Link } from "react-router-dom";

function Card(props) {
  const [{ basket }, dispatch] = useStateValue();
  // console.log("this is my basket >>>", basket);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: props,
    });
  };

  const viewProduct = () => {
    dispatch({
      type: "VIEW_PRODUCT",
      item: props,
    });
  };

  useEffect(() => {
    saveState(basket);
  }, [basket]);

  return (
    <div className="product">
      <div className="card text-center carding" style={{ width: "18rem" }}>
        <Link to={`/${props.id}`}>
          <img
            src={props.src}
            className="card-img-top"
            onClick={viewProduct}
            alt="..."
          />
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
