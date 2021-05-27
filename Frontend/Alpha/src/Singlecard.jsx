import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./designs/singleproduct.css";
import { saveState } from "./localStorage";
import Rating from "./components/Rating";
// import { useStateValue } from "./StateProvider";
import LoadingDiv from "./components/LoadingDiv";
import MessageDiv from "./components/MessageDiv";
import { detailsProduct } from "./actions/productActions";

function Singlecard() {
  //const [{ basket }] = useStateValue();

  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, singleCard } = productDetails;
  const [currentImg, setcurrentimg] = useState({});
  // console.log("currentImg ", singleCard);

  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  useEffect(() => {
    dispatch(detailsProduct(productId));
    console.log("hello");
  }, [dispatch, productId]);

  useEffect(() => {
    saveState(basket);
  }, [basket]);

  return (
    <div>
      {loading ? (
        <LoadingDiv></LoadingDiv>
      ) : error ? (
        <MessageDiv status="danger">{error}</MessageDiv>
      ) : (
        <div className="singlecard-wrapper">
          <div className="singlecard">
            {/* card left */}
            <div className="product-img">
              <div className="img-display">
                <div className="img-showcase">
                  <img
                    src={
                      Object.keys(currentImg).length == 0
                        ? singleCard.src
                        : currentImg
                    }
                    height="552px"
                    width="552px"
                  />
                </div>
              </div>
              <div className="img-select">
                <div className="img-item">
                  <Link to="#">
                    <img
                      src="https://scontent.fccu3-1.fna.fbcdn.net/v/t1.6435-9/182786553_320656522792810_3270474159293086348_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=730e14&_nc_ohc=UR0xPz-0HqgAX_R5t6F&_nc_ht=scontent.fccu3-1.fna&oh=ff56c0e8cf669efd0f40d272627212bb&oe=60C3925F"
                      onClick={(e) => setcurrentimg(e.target.src)}
                    />
                  </Link>
                </div>
                <div className="img-item">
                  <Link to="#">
                    <img
                      src="https://scontent.fccu3-1.fna.fbcdn.net/v/t1.6435-9/183537694_320001719524957_4509994418637092481_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=730e14&_nc_ohc=zHqWvdshuE4AX9K3lP4&_nc_ht=scontent.fccu3-1.fna&oh=7190b6a9b302d864d8c3d90de45b8b9c&oe=60C16CFB"
                      onClick={(e) => setcurrentimg(e.target.src)}
                    />
                  </Link>
                </div>
                <div className="img-item">
                  <Link to="#">
                    <img
                      src="https://scontent.fccu3-1.fna.fbcdn.net/v/t1.6435-9/177766036_311576633700799_2785427880820087419_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=BCI1tCo0OVgAX-Q5nDv&_nc_ht=scontent.fccu3-1.fna&oh=56a3c5f2c97d57d4ac47925b72c5fdd3&oe=60C31523"
                      onClick={(e) => setcurrentimg(e.target.src)}
                    />
                  </Link>
                </div>
                <div className="img-item">
                  <Link to="#">
                    <img
                      src="https://scontent.fccu3-1.fna.fbcdn.net/v/t1.6435-9/172649658_304546754403787_4363549573197020612_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=730e14&_nc_ohc=-p5ZeAzZzhkAX9Zv3hz&_nc_ht=scontent.fccu3-1.fna&oh=a059b586c6449ace8e8ce9bd7c38812e&oe=60C263FB"
                      onClick={(e) => setcurrentimg(e.target.src)}
                    />
                  </Link>
                </div>
              </div>
            </div>
            {/* card right */}
            <div className="product-content">
              <h2 className="product-title">{singleCard.title}</h2>
              <div className="product-rating">
                <Rating star={singleCard.star} />
              </div>
              <div className="product-price">
                <p className="price">
                  Price:<span>₹{singleCard.price}</span>
                </p>
              </div>
              <div className="product-detail">
                <h2>about this item:</h2>
                <p>{singleCard.p}</p>
                <ul>
                  <li>
                    Available: <span>in stock</span>
                  </li>
                  <li>
                    Category: <span>Gift</span>
                  </li>
                  <li>
                    Shipping Fee:<span>Free</span>
                  </li>
                </ul>
              </div>
              <div className="purchase-info">
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: singleCard,
                    });
                  }}
                >
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Singlecard;
