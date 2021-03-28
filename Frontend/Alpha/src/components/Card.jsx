import React from "react";
import { useStateValue } from "../StateProvider";

function Card(props) {
  const [{ basket }, dispatch] = useStateValue();
  // console.log("this is my basket >>>", basket);
  const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: props,
    });
  };
  console.log(props.id);
  return (
    <div className="product">
      <div className="card text-center carding" style={{ width: "18rem" }}>
        <img src={props.src} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.p}</p>
          <div className="product_rating">
            <small>₹</small>
            <strong>{props.price} </strong>
            {Array(props.star)
              .fill()
              .map((star) => (
                <p>⭐</p>
              ))}
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
