import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import './Signup.css'
import {isSignedIn} from '../../js/methods'

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

  if(isSignedIn())
  {
    return <Redirect to="/" />
  }


  return (<>
    <div className="signupBackground">
    <div className="signup">
    <h1> Sign Up </h1>
      <form onSubmit={submitSignup} >
        <div className="form-group">
          <label for="username" class="bmd-label-floating"> Username </label>
          <input type="text" class="form-control" id="username" value={input.username}/>
          <span className="bmd-help"> Username must be unique </span>
        </div>

          <div className="form-group">
            <label for="email" class="bmd-label-floating"> Email </label>
            <input type="email" class="form-control" id="email" value={input.email} />
            <span className="bmd-help" > Email must be unique </span>
          </div>

          <div className="form-group">
            <label for="password" class="bmd-label-floating"> Password </label>
            <input type="password" class="form-control" id="password" value={input.password} />
          </div>

          <div className="form-group">
            <label for="confirm" class="bmd-label-floating"> Confirm Password </label>
            <input type="password" class="form-control" id="confirm" value={input.confirm}/>
          </div>

          <button type="submit" className="btn btn-raised submit-button" style={{display : (input.valid ? "" : "none")}} > Sign Up </button>

      </form>
    </div>
    </div>
  </>)
}
export default Signup
