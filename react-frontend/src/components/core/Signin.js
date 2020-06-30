import React, {useState, useEffect} from 'react'
import NavBar from '../navbar/Navbar'
import "./Signin.css"

const Signin = props => {

  const [error, setError] = useState("")
  const [input, setInput] = useState({
    unique : "",
    password : ""
  })
  const [showSubmit, setShowSubmit] = useState(false)

  const handleInput = name => event => {

  }

  const submitSignIn = () => {

  }


  return (<>

    <NavBar {...props}/>

    <div className="signinBackground">
      <div className="signin">
        <h1> Sign In </h1>
        <form onSubmit={submitSignIn}>
          <div className="form-group">
            <label for="username" className="bmd-label-floating">
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

  </>)
}
export default Signin
