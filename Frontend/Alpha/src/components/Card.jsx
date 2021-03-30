import React from "react";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";

function Card(props) {
  // const [{ basket }, dispatch] = useStateValue();
  // // console.log("this is my basket >>>", basket);
  // const addToBasket = () => {
  //   //dispatch the item into the data layer
  //   dispatch({
  //     type: "ADD_TO_BASKET",
  //     item: props,
  //   });
  // };
  //console.log(props.id);
  const addToBasket = () => {
    const cartItem = db.collection("cartItems").doc(props.id); //create a document in the db with the product id
    cartItem.get().then((doc) => {
      if (doc.exists) {
        cartItem.update({
          quantity: doc.data().quantity + 1,
        });
      } else {
        db.collection("cartItems").doc(props.id).set({
          title: props.title,
          src: props.src,
          p: props.p,
          price: props.price,
          star: props.star,
          quantity: 1,
        });
      }
    });
  };

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
