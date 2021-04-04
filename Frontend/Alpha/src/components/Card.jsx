import React, { useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";
import Rating from "./Rating";
import { saveState } from "../localStorage";

function Card(props) {
  //
  const [{ basket }, dispatch] = useStateValue();
  // console.log("this is my basket >>>", basket);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: props,
    });
  };

  useEffect(() => {
    saveState(basket);
  }, [basket]);

  return (
    <div className="product">
      <div className="card text-center carding" style={{ width: "18rem" }}>
        {/* <Link to={`/card/${props.id}`}><img .../> </Link> */}
        <img src={props.src} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.p}</p>
          <div className="product_rating">
            <div>
              <small>₹</small>
              <strong>{props.price} </strong>
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
