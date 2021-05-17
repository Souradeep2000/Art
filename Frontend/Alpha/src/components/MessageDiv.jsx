import React from "react";
import "../designs/alert.css";

function MessageDiv(props) {
  return (
    <div className={`mess mess-${props.status || "initial"}`}>
      {props.children}
    </div>
  );
}

export default MessageDiv;
