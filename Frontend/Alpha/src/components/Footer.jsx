import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../designs/footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="foot-container">
        <div className="foot-row">
          <div className="foot-col">
            <h4>Art Aficionado</h4>
            <ul>
              <li>
                <Link to="#">about us </Link>
              </li>
              <li>
                <Link to="#">our services </Link>
              </li>
              <li>
                <Link to="#">privacy policy </Link>
              </li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Get Help</h4>
            <ul>
              <li>
                <Link to="#">FAQ </Link>
              </li>
              <li>
                <Link to="#">shipping </Link>
              </li>
              <li>
                <Link to="#">returns </Link>
              </li>
              <li>
                <Link to="#">order status </Link>
              </li>
              <li>
                <Link to="#">payment options </Link>
              </li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Categories</h4>
            <ul>
              <li>
                <Link to="#">birthday gifts </Link>
              </li>
              <li>
                <Link to="#">anniversary gifts </Link>
              </li>
              <li>
                <Link to="#">handicrafts </Link>
              </li>
              <li>
                <Link to="#">frames </Link>
              </li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Follow Us</h4>
            <div className="soc-links">
              <Link to="#">
                <FacebookIcon />
              </Link>
              <Link to="#">
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </Link>
              <Link to="#">
                <FontAwesomeIcon icon={["fab", "youtube"]} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
