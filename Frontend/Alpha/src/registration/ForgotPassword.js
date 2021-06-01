import React, { useEffect, useState } from "react";
import profile from "./img/profile.svg";
import forgetPass from "./img/forgetPass.svg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "../designs/profileUpdate.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingDiv from "../components/LoadingDiv";
import MessageDiv from "../components/MessageDiv";
import { useHistory, useParams } from "react-router";
import { newPasswordSet } from "../actions/userActions";

function ProfileUpdate() {
  const { id, token } = useParams();
  let history = useHistory();
  const userNewPassword = useSelector((state) => state.userNewPassword);
  const {
    loading: loadingNewPass,
    error: errorNewPass,
    newPass,
  } = userNewPassword;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (newPass) {
      setTimeout(() => {
        history.push("/sign");
      }, 3000);
    }
  }, [dispatch, id, token, newPass]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length > 6) {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password doesn't match!");
      } else {
        dispatch(newPasswordSet(id, token, password));
      }
    } else {
      alert("Password is too weak to set");
    }
  };

  // design

  const [input3Clicked, setInput3Clicked] = useState(false);
  const [input4Clicked, setInput4Clicked] = useState(false);

  const addFocus3 = () => {
    setInput3Clicked(true);
  };
  const removeFocus3 = () => {
    setInput3Clicked(false);
  };

  const addFocus4 = () => {
    setInput4Clicked(true);
  };
  const removeFocus4 = () => {
    setInput4Clicked(false);
  };

  return (
    <div className="update-dabba">
      <div className="img">
        <img src={forgetPass} />
      </div>
      <div className="update-container">
        <form action="" onSubmit={submitHandler}>
          <img src={profile} className="avatar" />
          <h2>Update</h2>
          <>
            {loadingNewPass && <LoadingDiv></LoadingDiv>}
            {errorNewPass && (
              <MessageDiv status="danger">{errorNewPass}</MessageDiv>
            )}

            {newPass && (
              <MessageDiv status="success">
                Password Updated Successfully
              </MessageDiv>
            )}

            <div className={`input_div three ${input3Clicked ? "focus" : ""} `}>
              <div className="i">
                <LockOpenIcon id="ic" />
              </div>
              <div>
                <input
                  className="__input"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={addFocus3}
                  onBlur={removeFocus3}
                />
              </div>
            </div>

            <div className={`input_div four ${input4Clicked ? "focus" : ""} `}>
              <div className="i">
                <LockOutlinedIcon id="ic" />
              </div>
              <div>
                <input
                  className="__input"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onClick={addFocus4}
                  onBlur={removeFocus4}
                />
              </div>
            </div>
            <input type="submit" className="update_button" value="update" />
          </>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;
