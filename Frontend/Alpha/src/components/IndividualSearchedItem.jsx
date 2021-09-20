import React from "react";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";

function IndividualSearchedItem(props) {
  return (
    <div className="searched-item">
      <div className="item-img">
        <img src={props.src} alt="" />
      </div>
      <div className="item-content">
        <div className="item-about">
          <h3>{props.title}</h3>
          <div className="rat-rev">
            <div className="search-rating">
              {props.numReviews !== 0
                ? (props.star / props.numReviews).toFixed(1)
                : 0}
              <StarOutlinedIcon style={{ paddingBottom: 2 }} />
            </div>
            <p>
              {props.star} ratings & {props.numReviews} reviews
            </p>
          </div>

          <p>{props.p}</p>
        </div>
        <div className="item-price">₹{props.price}</div>
      </div>
    </div>
  );
}

export default IndividualSearchedItem;
