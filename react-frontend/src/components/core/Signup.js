import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import "./Signup.css";
import {isSignedIn, validateUsername} from "../../js/methods";

const Signup = props => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
    valid : false
  });

  const handleInput = name => evt => {
    const change = evt.target.value;

    const usernameValidation = validateUsername(change);
    // if usernameValidation is null then the input is valid.
    let newInput = {...input};
    if (usernameValidation == null) {
      newInput = {...newInput, error : ""}
    } else {
      newInput = {...newInput, error: "Username cannot contain " + usernameValidation}
    }
    newInput = {...newInput, [name] : change};
    setInput(newInput);
  };

  const submitSignup = evt => {
    evt.preventDefault();
    alert("submitted");
  };

  if (isSignedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="signupBackground">
        <div className="signup">
          <h1> Sign Up </h1>
          <form onSubmit={submitSignup}>
            <div className="form-group">
              <label for="username" className="bmd-label-floating">
                {" "}
                Username{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={input.username}
                onChange={handleInput("username")}
              />
              <span className="bmd-help"> Username must be unique </span>
            </div>

            <div className="form-group">
              <label for="email" className="bmd-label-floating">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={input.email}
                onChange={handleInput("email")}
              />
              <span className="bmd-help"> Email must be unique </span>
            </div>

            <div className="form-group">
              <label for="password" className="bmd-label-floating">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={input.password}
                onChange={handleInput("password")}
              />
            </div>

            <div className="form-group">
              <label for="confirm" className="bmd-label-floating">
                {" "}
                Confirm Password{" "}
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm"
                name="confirm"
                value={input.confirm}
                onChange={handleInput("confirm")}
              />
            </div>

            <div
              className="alert alert-danger"
              style={{display: input.error.length ? "" : "none"}}
            >
              {input.error}
            </div>

            <button
              type="submit"
              className="btn btn-raised submit-button"
              style={{display: input.valid ? "" : "none"}}
            >
              {" "}
              Sign Up{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
