import React, { useEffect } from "react";
import "../designs/card.css";
import Rating from "./Rating";
import { saveState } from "../localStorage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";

function Card(props) {
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: props,
    });
  };

  useEffect(() => {
    saveState(basket);
  }, [basket]);

  const handleDestroy = async (images) => {
    try {
      const enterName = prompt(
        "Enter the name of the product to delete permanently: "
      );
      if (enterName === props.title) {
        if (userInfo && userInfo.isAdmin) {
          const destroyImage = await axios.post("/s3Url", { images });
          const deleteProduct = await axios.delete(`/cardUpload/${props._id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          window.location.reload();
        } else
          return alert(
            "You are not an Admin and please mail us how did you got here"
          );
      } else return alert("Input error:");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="product">
      <div className="card text-center carding" style={{ width: "18rem" }}>
        <Link to={`/product/${props._id}`}>
          <img src={props.src} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.p.substring(0, 70) + "..."}</p>
          <div className="product_rating">
            <Rating star={props.star / props.numReviews} />
            <div>
              <small style={{ color: " #20a020" }}>₹</small>
              <strong style={{ color: " #20a020" }}>{props.price} </strong>
            </div>
          </div>
          {userInfo && userInfo.isAdmin ? (
            <Link to={`/editproduct/${props._id}`}>
              <button className="btn btn-primary card-add">Edit</button>
              <button
                className="btn btn-primary card-add"
                onClick={() => handleDestroy(props.src)}
              >
                Delete
              </button>
            </Link>
          ) : (
            <button className="btn btn-primary card-add" onClick={addToBasket}>
              Add to Basket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
