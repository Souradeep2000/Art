import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./designs/singleproduct.css";
import { saveState } from "./localStorage";
import Rating from "./components/Rating";
import LoadingDiv from "./components/LoadingDiv";
import MessageDiv from "./components/MessageDiv";
import { detailsProduct } from "./actions/productActions";
import io from "socket.io-client";
import CommentBox from "./components/CommentBox";
import { listComments } from "./actions/commentActions";
import AllComments from "./components/AllComments";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "https://art-aficionado-backend.herokuapp.com"
    : window.location.host;

function Singlecard() {
  const commentList = useSelector((state) => state.commentList);
  const { loading: loadCom, error: errorCom, cmts, infLen } = commentList;
  const [page, setPage] = useState(1);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (cmts !== undefined) {
      setComments(cmts);
    }
  }, [cmts]);

  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, singleCard } = productDetails;
  const [currentImg, setcurrentimg] = useState({});

  const productCart = useSelector((state) => state.productCart);
  const { basket } = productCart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    dispatch(detailsProduct(productId));
    const socket = io(ENDPOINT);
    setSocket(socket);
    return () => socket.close();
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(listComments(productId, page));
  }, [productId, page]);

  useEffect(() => {
    saveState(basket);
  }, [basket]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", productId);
    }
  }, [socket, productId]);

  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (msg) => {
        if (comments !== undefined) {
          setComments([msg, ...cmts]);
        }
      });
      return () => socket.off("sendCommentToClient");
    }
  }, [socket, cmts]);

  const load = () => {
    setPage((prev) => prev + 1);
    console.log(page);
  };

  return (
    <div>
      {loading ? (
        <LoadingDiv></LoadingDiv>
      ) : error ? (
        <MessageDiv status="danger">{error}</MessageDiv>
      ) : (
        <div>
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
                    />
                  </div>
                </div>
                <div className="img-select">
                  <div className="img-item">
                    <Link to="#">
                      <img
                        src="https://art-aficionado-direct-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-09+at+12.29.24+PM+(1).jpeg"
                        onClick={(e) => setcurrentimg(e.target.src)}
                      />
                    </Link>
                  </div>
                  <div className="img-item">
                    <Link to="#">
                      <img
                        src="https://art-aficionado-direct-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-09+at+12.29.24+PM.jpeg"
                        onClick={(e) => setcurrentimg(e.target.src)}
                      />
                    </Link>
                  </div>
                  <div className="img-item">
                    <Link to="#">
                      <img
                        src="https://art-aficionado-direct-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-09+at+12.29.25+PM+(1).jpeg"
                        onClick={(e) => setcurrentimg(e.target.src)}
                      />
                    </Link>
                  </div>
                  <div className="img-item">
                    <Link to="#">
                      <img
                        src="https://art-aficionado-direct-image.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2021-09-09+at+12.29.25+PM.jpeg"
                        onClick={(e) => setcurrentimg(e.target.src)}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              {/* card right */}
              <div className="product-content">
                <h2 className="product-title">{singleCard.title}</h2>
                <div className="product-reviews">
                  <strong>Rating :</strong>
                  {singleCard.numReviews} reviews
                </div>
                <div className="product-rating">
                  <Rating star={singleCard.star / singleCard.numReviews} />
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
          <div className="comment-box">
            <div className="comments">
              <h2 className="comment_title product-title">Ratings & Reviews</h2>

              {userInfo && (
                <CommentBox
                  productId={productId}
                  socket={socket}
                  username={userInfo.name}
                  user_id={userInfo._id}
                  token={userInfo.token}
                />
              )}
              <AllComments cmts={comments} />
              <button
                style={{
                  opacity: "75%",
                  padding: "1px",
                  color: "white",
                  backgroundColor: "#444",
                  border: "1px solid white",
                  borderRadius: "5px",
                }}
                onClick={load}
              >
                Load more
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Singlecard;
