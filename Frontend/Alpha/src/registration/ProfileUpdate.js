import React, { useEffect, useState } from "react";
import update from "./img/update.svg";
import profile from "./img/profile.svg";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import "../designs/profileUpdate.css";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingDiv from "../components/LoadingDiv";
import MessageDiv from "../components/MessageDiv";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileUpdate() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(setName(user.name));
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password doesn't match!");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, password }));
    }
  };

  // design

  const [input1Clicked, setInput1Clicked] = useState(false);
  //const [input2Clicked, setInput2Clicked] = useState(false);
  const [input3Clicked, setInput3Clicked] = useState(false);
  const [input4Clicked, setInput4Clicked] = useState(false);
  const addFocus1 = () => {
    setInput1Clicked(true);
  };
  const removeFocus1 = () => {
    setInput1Clicked(false);
  };

  // const addFocus2 = () => {
  //   setInput2Clicked(true);
  // };
  // const removeFocus2 = () => {
  //   setInput2Clicked(false);
  // };

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
        <img src={update} />
      </div>
      <div className="update-container">
        <form action="" onSubmit={submitHandler}>
          <img src={profile} className="avatar" />
          <h2>Update</h2>
          {loading ? (
            <LoadingDiv></LoadingDiv>
          ) : error ? (
            <MessageDiv status="danger"> {error}</MessageDiv>
          ) : (
            <>
              {loadingUpdate && <LoadingDiv></LoadingDiv>}
              {errorUpdate && (
                <MessageDiv status="danger">{errorUpdate}</MessageDiv>
              )}

              {successUpdate && (
                <MessageDiv status="success">
                  Profile Updated Successfully
                </MessageDiv>
              )}

              <div className={`input_div one ${input1Clicked ? "focus" : ""} `}>
                <div className="i">
                  <PersonOutlineIcon id="ic" />
                </div>
                <div>
                  <input
                    className="__input"
                    type="text"
                    value={name}
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    onClick={addFocus1}
                    onBlur={removeFocus1}
                  />
                </div>
              </div>

              {/* <div className={`input_div two ${input2Clicked ? "focus" : ""} `}>
                <div className="i">
                  <EmailOutlinedIcon id="ic" />
                </div>
                <div>
                  <h5>Email</h5>
                  <input
                    className="__input"
                    type="text"
                    value={name
                    }
                    onChange={(e) => setName(e.target.value)}
                    onClick={addFocus2}
                    onBlur={removeFocus2}
                  />
                </div>
              </div> */}

              <div
                className={`input_div three ${input3Clicked ? "focus" : ""} `}
              >
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

              <div
                className={`input_div four ${input4Clicked ? "focus" : ""} `}
              >
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
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;
