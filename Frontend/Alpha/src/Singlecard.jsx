import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./designs/singleproduct.css";
import { saveState } from "./localStorage";
import Rating from "./components/Rating";
import { useStateValue } from "./StateProvider";

function Singlecard() {
  const [{ basket, currentProduct }, dispatch] = useStateValue();
  const [currentImg, setcurrentimg] = useState(currentProduct.src);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: currentProduct,
    });
  };
  useEffect(() => {
    saveState(basket);
  }, [basket]);

  return (
    <div className="singlecard-wrapper">
      <div className="singlecard">
        {/* card left */}
        <div className="product-img">
          <div className="img-display">
            <div className="img-showcase">
              <img src={currentImg} height="552px" width="552px" />
            </div>
          </div>
          <div className="img-select">
            <div className="img-item">
              <Link to="#">
                <img
                  src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/121105212_197680348436281_873870113726337107_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=nsNxf_rVgeUAX9KUkp-&edm=AP_V10EAAAAA&ccb=7-4&oh=6b955579988a6dcbef129b3ad606fecd&oe=60918B32&_nc_sid=4f375e"
                  onClick={(e) => setcurrentimg(e.target.src)}
                />
              </Link>
            </div>
            <div className="img-item">
              <Link to="#">
                <img
                  src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/158742363_242798497511972_6069039589044398913_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=2Guhj1Rc_scAX8eotiT&edm=AP_V10EAAAAA&ccb=7-4&oh=4e5abbc95e76f29cd93578a2502200a9&oe=6090E9F6&_nc_sid=4f375e"
                  onClick={(e) => setcurrentimg(e.target.src)}
                />
              </Link>
            </div>
            <div className="img-item">
              <Link to="#">
                <img
                  src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/131338895_2464771647164655_2898982616008221285_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=3kWul8cIcr8AX-z6iGy&edm=AABBvjUAAAAA&ccb=7-4&oh=6a9794b07dc2cb3e4648f16ea20eaa20&oe=608F4994&_nc_sid=83d603"
                  onClick={(e) => setcurrentimg(e.target.src)}
                />
              </Link>
            </div>
            <div className="img-item">
              <Link to="#">
                <img
                  src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/154069987_550637389248500_3470165432379612309_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=-W6Xz03-PCoAX-VgEKq&edm=AP_V10EAAAAA&ccb=7-4&oh=ecad7d413ed9a8eb317b33d475484440&oe=60905A4C&_nc_sid=4f375e"
                  onClick={(e) => setcurrentimg(e.target.src)}
                />
              </Link>
            </div>
          </div>
        </div>
        {/* card right */}
        <div className="product-content">
          <h2 className="product-title">{currentProduct.title}</h2>
          <div className="product-rating">
            <Rating star={currentProduct.star} />
          </div>
          <div className="product-price">
            <p className="price">
              Price:<span>₹{currentProduct.price}</span>
            </p>
          </div>
          <div className="product-detail">
            <h2>about this item:</h2>
            <p>{currentProduct.p}</p>
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
            <button type="button" className="button" onClick={addToBasket}>
              Add to Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singlecard;
