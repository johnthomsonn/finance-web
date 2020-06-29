import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import "./Signup.css";
import {isSignedIn, validateUsername, validateEmail} from "../../js/methods";

const Signup = props => {

  //state
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState("")
  const [showSubmit, setShowSubmit] = useState(false)
  const [validState, setValidState] = useState({
    username : false,
    email : false,
    password : false
  })

  //effects
  useEffect( () => shouldSubmitButtonAppear() , [validState])

  //called whenever the user presses a key in the submit form
  const handleInput = name => evt => {
    const change = evt.target.value;
    //set the new input
    setInput({...input, [name] : change});

    //sets the input state to be valid or not depending on user input
    setInputState(name, change)

  };

  //sets the input state by checking if the input is valid
  const setInputState = (name, change) => {
    if( name === "username")
      setValidState({...validState, username : isValidUsername(change)});
    else if(name === "email")
      setValidState({...validState, email : isValidEmail(change)});
    else if(name ==="confirm")
      setValidState({...validState, password : input.password.length != 0 && input.password === change});
    else if(name ==="password")
      setValidState({...validState, password : change.length != 0 && change === input.confirm});
  }

  // checks to see if user input is valid by checking the valid state then sets the showSubmit state
  const shouldSubmitButtonAppear =  () => {
      setShowSubmit((validState.username && validState.password && validState.email) ? true : false)
  }

  const submitSignup = evt => {
    evt.preventDefault();
    alert("submitted");
  };

  const isValidUsername =  username => {
    let isValid = false;
    //will return an array of invalid chars if any match or null if nothing matches (We want null)
    const usernameValidation = validateUsername(username);
    // if usernameValidation is null then the input is valid.
    let newInputError = "";
    if (usernameValidation == null) {
      newInputError = "";
      isValid = true;
    } else {
      newInputError = "Username cannot contain " + usernameValidation.join("");
    }
    setError(newInputError);
    return isValid;
  }

  const isValidEmail = email => {
    let isValid = false;
    // returns true or false if whole regex matches
    const emailValidation = validateEmail(email);
    let newInputError = "";
    if(emailValidation)
    {
      newInputError = "";
      isValid = true;
    }
    else
    {
      newInputError = "Invalid email";
    }
    setError(newInputError);
    return isValid;
  }

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
              style={{display: error.length ? "" : "none"}}
            >
              {error}
            </div>

            <button
              type="submit"
              className="btn btn-raised submit-button"
              style={{display: showSubmit ? "" : "none"}}
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
