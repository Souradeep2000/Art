import React from "react";
import "../designs/alert.css";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";

function LoadingDiv() {
  return (
    <div className="loading">
      {/* <CachedRoundedIcon className="success" /> */}
      <div className="loader"></div>
      <p className="loading-text">Loading please wait </p>
    </div>
  );
}

export default LoadingDiv;
