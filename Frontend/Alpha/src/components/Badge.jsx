import React from "react";
import { Link } from "react-router-dom";

function Badge() {
  return (
    <div>
      <Link to="/" className="navbar-brand">
        Art Aficionado
      </Link>
    </div>
  );
}

export default Badge;
