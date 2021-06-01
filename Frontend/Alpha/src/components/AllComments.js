import React from "react";
import Rating from "./Rating";
import moment from "moment";

function AllComments({ cmts }) {
  return (
    <div className="comments_list">
      {cmts !== undefined &&
        cmts.map((item) => (
          <div key={item._id} className="comment_card">
            <div className="comment_card_row">
              <h3>{item.username}</h3>
              {item.rating !== 0 && <Rating star={item.rating} />}
            </div>

            <span>{moment(item.createdAt).fromNow()}</span>
            <span>{new Date(item.createdAt).toLocaleString()}</span>

            <p dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        ))}
    </div>
  );
}

export default AllComments;
