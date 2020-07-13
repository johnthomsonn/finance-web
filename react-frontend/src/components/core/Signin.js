import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from '../navbar/Navbar'
import "./Signin.css"
import { isSignedIn } from '../../js/methods'

const Signin = props => {

  const [error, setError] = useState("")
  const [input, setInput] = useState({
    unique: "",
    password: "",
    redirectToProfile: false
  })
  const [showSubmit, setShowSubmit] = useState(false)
  const [validState, setValidState] = useState({
    unique: false,
    password: false
  })

  useEffect(() => shouldSubmitButtonAppear(), [validState])

  const setInputState = (name, change) => {

    if (name === "unique")
      setValidState({ ...validState, unique: change.length > 0 })

    if (name === "password")
      setValidState({ ...validState, password: change.length >= 8 });
  }


  const handleInput = name => event => {
    const change = event.target.value;
    //set the new input
    setInput({ ...input, [name]: change });

    //sets the input state to be valid or not depending on user input
    setInputState(name, change)
  }

  const submitSignIn = evt => {
    evt.preventDefault();

    const { unique, password } = input;

    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signin`, {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        unique,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        }
        else {
          if (typeof window !== undefined) {
            window.sessionStorage.setItem("user", JSON.stringify(data.user));
            window.sessionStorage.setItem("balance", data.balance)
            setInput({ ...input, redirectToProfile: true });
          }
        }
      })
      .catch(err => console.log(err))

  }

  const shouldSubmitButtonAppear = () => {
    setShowSubmit((validState.unique && validState.password) ? true : false)
  }

  if (input.redirectToProfile) {
    const username = JSON.parse(window.sessionStorage.getItem("user")).username;
    return <Redirect to={`/${username}`} />
  }


  if (isSignedIn()) {
    const username = JSON.parse(window.sessionStorage.getItem("user")).username;
    return <Redirect to={`/${username}`} />;
  }

  return (<>

    <NavBar {...props} />

    <div className="signinBackground">
      <div className="signin">
        <h1> Sign In </h1>
        <form onSubmit={submitSignIn}>
          <div className="form-group">
            <label for="unique" className="bmd-label-floating">
              Username or Email
            </label>
            <input
              type="text"
              className="form-control"
              id="unique"
              name="unique"
              value={input.unique}
              onChange={handleInput("unique")}
            />
          </div>


          <div className="form-group">
            <label for="password" className="bmd-label-floating">
              Password
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

          <div
            className="alert alert-danger"
            style={{ display: error.length ? "" : "none" }}
          >
            {error}
          </div>

          <button
            type="submit"
            className="btn btn-raised submit-button"
            style={{ display: showSubmit ? "" : "none" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>

  </>)
}
export default Signin
