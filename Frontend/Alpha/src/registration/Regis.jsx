import React, { useState } from "react";
import "../designs/registration.css";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { Link, useHistory } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inlogo from "../registration/img/in.svg";
import uplogo from "../registration/img/up.svg";
import { auth } from "../firebase";

function Regis() {
  const history = useHistory();
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [username, Setusername] = useState("");
  const SignIn = (e) => {
    e.preventDefault();
    //firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    //firebase register, where auth is the information about the user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          auth.user.updateProfile({
            displayName: username,
          });
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  // for adding animate class
  const [signup, setSignup] = useState(false);
  const handleUp = () => {
    setSignup(true);
  };
  const handleIn = () => {
    setSignup(false);
  };

  return (
    <div>
      <div className={`dabba  ${signup ? "sign-up-mode" : ""}  `}>
        <div className="forms-dabba">
          <div className="signin-signup">
            {/* 1st login form */}
            <form action="" className="sign-in-form">
              <h2 className="title">Sign in</h2>

              <div className="input-field">
                <div className="icon">
                  <EmailOutlinedIcon />
                </div>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => Setemail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <div className="icon">
                  <LockOutlinedIcon />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => Setpassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Login"
                className="butn solid"
                onClick={SignIn}
              />
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

            {/* 2nd sign up form */}

            <form action="" className="sign-up-form">
              <h2 className="title">Sign up</h2>

              <div className="input-field">
                <div className="icon">
                  <PersonOutlineIcon />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => Setusername(e.target.value)}
                />
              </div>
              <div className="input-field">
                <div className="icon">
                  <EmailOutlinedIcon />
                </div>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => Setemail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <div className="icon">
                  <LockOutlinedIcon />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => Setpassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Sign up"
                className="butn solid"
                onClick={register}
              />
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
