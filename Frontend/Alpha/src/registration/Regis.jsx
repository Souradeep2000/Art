import React, { useState } from "react";
import "../designs/registration.css";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inlogo from "../registration/img/in.svg";
import uplogo from "../registration/img/up.svg";

function Regis() {
  const [signup, setSignup] = useState(false);
  const handleUp = () => {
    setSignup(true);
  };
  const handleIn = () => {
    setSignup(false);
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className={`dabba  ${signup ? "sign-up-mode" : ""}  `}>
        <div className="forms-dabba">
          <div className="signin-signup">
            {/* 1st form */}
            <form action="" className="sign-in-form" onSubmit={submitHandler}>
              <h2 className="title">Sign in</h2>

              <div className="input-field">
                <div className="icon">
                  <EmailOutlinedIcon />
                </div>
                <input type="email" placeholder="email" />
              </div>
              <div className="input-field">
                <div className="icon">
                  <LockOutlinedIcon />
                </div>
                <input type="password" placeholder="Password" />
              </div>

              <input type="submit" value="Login" className="butn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <Link to="#" className="social-icon">
                  <FacebookIcon />
                </Link>
                <Link to="#" className="social-icon">
                  <FontAwesomeIcon icon={["fab", "google"]} />
                </Link>
              </div>
            </form>

            {/* 2nd form */}

            <form action="" className="sign-up-form" onSubmit={submitHandler}>
              <h2 className="title">Sign up</h2>

              <div className="input-field">
                <div className="icon">
                  <PersonOutlineIcon />
                </div>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <div className="icon">
                  <EmailOutlinedIcon />
                </div>
                <input type="email" placeholder="email" />
              </div>
              <div className="input-field">
                <div className="icon">
                  <LockOutlinedIcon />
                </div>
                <input type="password" placeholder="Password" />
              </div>

              <input type="submit" value="Sign up" className="butn solid" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <Link to="#" className="social-icon">
                  <FacebookIcon />
                </Link>
                <Link to="#" className="social-icon">
                  <FontAwesomeIcon icon={["fab", "google"]} />
                </Link>
              </div>
            </form>
          </div>
        </div>
        {/* panel*/}
        <div className="panels-dabba">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>don't worry we got your back </p>
              <button
                className="butn transparent"
                id="sign-up-btn"
                onClick={handleUp}
              >
                Sign up
              </button>
            </div>
            <img src={uplogo} alt="" className="image" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>
                then sign in to check some exciting gifts those are value for
                money
              </p>
              <button
                className="butn transparent"
                id="sign-in-btn"
                onClick={handleIn}
              >
                Sign in
              </button>
            </div>
            <img src={inlogo} alt="" className="image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regis;
