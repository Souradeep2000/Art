import React from "react";
import { Link } from "react-router-dom";

function Badge() {
  return (
    <div>
      <Link to="/">
        <a className="navbar-brand" href="#">
          Art Aficionado
        </a>
      </Link>
    </div>
  );
}

export default Badge;
