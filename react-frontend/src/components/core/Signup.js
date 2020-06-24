import React, {useState} from 'react'
import './Signup.css'

const Signup = props => {

  const [input, setInput] = useState({
    username : "",
    email : "",
    password : "",
    confirm : "",
    valid : false
  })

  const submitSignup = evt => {
    evt.preventDefault();
    alert("submitted")


  }


  return (<>
    <div className="signupBackground">
    <div className="signup">
    <h1> Sign Up </h1>
      <form onSubmit={submitSignup} >
        <div className="form-group">
          <label for="username" class="bmd-label-floating"> Username </label>
          <input type="text" class="form-control" id="username" />
          <span className="bmd-help"> Username must be unique </span>
        </div>

          <div className="form-group">
            <label for="email" class="bmd-label-floating"> Email </label>
            <input type="email" class="form-control" id="email" />
            <span className="bmd-help" > Email must be unique </span>
          </div>

          <div className="form-group">
            <label for="password" class="bmd-label-floating"> Password </label>
            <input type="password" class="form-control" id="password" />
          </div>

          <div className="form-group">
            <label for="confirm" class="bmd-label-floating"> Confirm Password </label>
            <input type="password" class="form-control" id="confirm" />
          </div>

          <button type="submit" className="btn btn-raised submit-button"> Sign Up </button>

      </form>
    </div>
    </div>
  </>)
}
export default Signup
