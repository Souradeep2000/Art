import React, { useRef, useState } from "react";
import "../designs/commentBox.css";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../actions/commentActions";
import LoadingDiv from "./LoadingDiv";
import MessageDiv from "./MessageDiv";

function CommentBox({ productId, socket, username, user_id, token }) {
  const contentRef = useRef();

  const [rating, setRating] = useState(0);

  const commentPost = useSelector((state) => state.commentPost);
  const { loading, success, error } = commentPost;

  const dispatch = useDispatch();

  const commentSubmitHandler = () => {
    const content = contentRef.current.innerHTML;

    if (!user_id) {
      return alert("Please login to submit your point of view");
    }

    const createdAt = new Date().toISOString();

    if (rating !== 0 && content !== "") {
      socket.emit("createComment", {
        username,
        content,
        product_id: productId,
        rating,
        user_id,
        createdAt,
      });
    } else if (content.length < 2) {
      return alert("Kindly rate this product to post your review");
    }

    if (rating === 0) {
      return alert("Kindly rate this product to post your review");
    } else if (rating && rating !== 0) {
      dispatch(postComment(token, rating, productId));
    }

    contentRef.current.innerHTML = "";
  };

  return (
    <div>
      <div className="reviews">
        <input
          type="radio"
          name="rate"
          id="rd-5"
          onChange={() => setRating(5)}
        />
        <label htmlFor="rd-5" className="fas fa-star"></label>

        <input
          type="radio"
          name="rate"
          id="rd-4"
          onChange={() => setRating(4)}
        />
        <label htmlFor="rd-4" className="fas fa-star"></label>

        <input
          type="radio"
          name="rate"
          id="rd-3"
          onChange={() => setRating(3)}
        />
        <label htmlFor="rd-3" className="fas fa-star"></label>

        <input
          type="radio"
          name="rate"
          id="rd-2"
          onChange={() => setRating(2)}
        />
        <label htmlFor="rd-2" className="fas fa-star"></label>

        <input
          type="radio"
          name="rate"
          id="rd-1"
          onChange={() => setRating(1)}
        />
        <label htmlFor="rd-1" className="fas fa-star"></label>
      </div>

      <div className="comment_form">
        <p style={{ fontFamily: "cursive", color: "green" }}>{username}</p>
        <p>Content</p>
        <div
          ref={contentRef}
          contentEditable="true"
          style={{
            height: "120px",
            backgroundColor: "whitesmoke",
            border: "1px solid #343a40",
            borderRadius: "10px",
            padding: "7px 15px",
            outline: "none",
          }}
        />
        {loading ? (
          <LoadingDiv></LoadingDiv>
        ) : error ? (
          <MessageDiv status="danger">{error}</MessageDiv>
        ) : (
          <button onClick={commentSubmitHandler}>Post</button>
        )}
      </div>
    </div>
  );
}

export default CommentBox;
