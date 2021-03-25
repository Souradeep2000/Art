import React from "react";

function Card(props) {
  return (
    // col-lg-3 col-md-3 col-sm-12
    <div className="product">
      <div className="card text-center carding" style={{ width: "18rem" }}>
        <img src={props.src} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.p}</p>
          <div className="product_rating">
            <small>₹</small>
            <strong>price </strong>
            {Array(props.star)
              .fill()
              .map((_, i) => (
                <p>⭐</p>
              ))}
          </div>

          <a href={props.a} className="btn btn-primary card-buy">
            Buy
          </a>
          <a href={props.a} className="btn btn-primary card-add">
            Add to Basket
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
