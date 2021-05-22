import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import "../designs/rating.css";

function Rating(props) {
  return (
    <div className="star">
      {props.star >= 1 ? (
        <StarIcon />
      ) : props.star >= 0.5 ? (
        <StarHalfIcon />
      ) : (
        <StarOutlineIcon />
      )}
      {props.star >= 2 ? (
        <StarIcon />
      ) : props.star >= 1.5 ? (
        <StarHalfIcon />
      ) : (
        <StarOutlineIcon />
      )}
      {props.star >= 3 ? (
        <StarIcon />
      ) : props.star >= 2.5 ? (
        <StarHalfIcon />
      ) : (
        <StarOutlineIcon />
      )}
      {props.star >= 4 ? (
        <StarIcon />
      ) : props.star >= 3.5 ? (
        <StarHalfIcon />
      ) : (
        <StarOutlineIcon />
      )}
      {props.star >= 5 ? (
        <StarIcon />
      ) : props.star >= 4.5 ? (
        <StarHalfIcon />
      ) : (
        <StarOutlineIcon />
      )}
    </div>
  );
}

export default Rating;
