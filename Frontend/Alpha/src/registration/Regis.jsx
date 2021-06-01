import React, { useEffect, useState } from "react";
import "../designs/registration.css";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { Link, useHistory, useLocation } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import inlogo from "../registration/img/in.svg";
import uplogo from "../registration/img/up.svg";
import { useDispatch, useSelector } from "react-redux";
import { forgetpassword, register, signin } from "../actions/userActions";
import LoadingDiv from "../components/LoadingDiv";
import MessageDiv from "../components/MessageDiv";
import LockOpenIcon from "@material-ui/icons/LockOpen";

function Regis() {
  const history = useHistory();
  let location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  // login
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;

  const userForgetPassword = useSelector((state) => state.userForgetPassword);
  const {
    loading: loadingForget,
    error: errorForget,
    userPasswordRecovery,
  } = userForgetPassword;

  const dispatch = useDispatch();

  const SignIn = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history.push, redirect, userInfo]);

  //register
  const [username, Setusername] = useState("");
  const [regemail, regSetemail] = useState("");
  const [regpassword, regSetpassword] = useState("");
  const [regConfirmpassword, regSetConfirmpassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);

  const Register = (e) => {
    e.preventDefault();
    if (username.length < 5 || regemail.length < 10) {
      return alert("Your name or email to short!");
    }

    if (regpassword.length > 6) {
      if (regpassword !== regConfirmpassword) {
        alert("Password should match with Confirm Password");
      } else {
        dispatch(register(username, regemail, regpassword));
      }
    } else {
      alert("Password is too weak to set");
    }
  };

  useEffect(() => {
    if (userRegister.userDetails) {
      history.push(redirect);
    }
  }, [history.push, redirect, userRegister.userDetails]);

  // for adding animate class
  const [signup, setSignup] = useState(false);
  const handleUp = () => {
    setSignup(true);
  };
  const handleIn = () => {
    setSignup(false);
  };

  // forgot password
  const forgotPasswordHandler = () => {
    if (!email) {
      alert("Please enter your email");
    } else {
      dispatch(forgetpassword(email));
    }
  };

  useEffect(() => {
    if (userPasswordRecovery) {
      setTimeout(() => {
        history.push(redirect);
      }, 3000);
    }
    if (errorForget) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [history.push, redirect, userPasswordRecovery, errorForget]);

  return (
    <div>
      <div className={`dabba  ${signup ? "sign-up-mode" : ""}  `}>
        <div className="forms-dabba">
          <div className="signin-signup">
            {/* 1st login form */}
            <form action="" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              {loading && <LoadingDiv></LoadingDiv>}
              {error && <MessageDiv status={"danger"}>{error}</MessageDiv>}
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
              {loadingForget ? (
                <LoadingDiv></LoadingDiv>
              ) : errorForget ? (
                <MessageDiv status="danger"> {errorForget}</MessageDiv>
              ) : userPasswordRecovery ? (
                <MessageDiv status="success">
                  Pasword Rest link has been sent in your registered email
                </MessageDiv>
              ) : (
                <Link to="#" onClick={forgotPasswordHandler}>
                  <p className="social-text">forgot password?</p>
                </Link>
              )}
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
              {userRegister.loading && <LoadingDiv></LoadingDiv>}
              {userRegister.error && (
                <MessageDiv status={"initial"}>
                  {userRegister.error +
                    " email already exists or fill the details properly"}
                </MessageDiv>
              )}
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
                  value={regemail}
                  onChange={(e) => regSetemail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <div className="icon">
                  <LockOpenIcon />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={regpassword}
                  onChange={(e) => regSetpassword(e.target.value)}
                />
              </div>
              <div className="input-field">
                <div className="icon">
                  <LockOutlinedIcon />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={regConfirmpassword}
                  onChange={(e) => regSetConfirmpassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Sign up"
                className="butn solid"
                onClick={Register}
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
