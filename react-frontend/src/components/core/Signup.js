import React from 'react'
import './Signup.css'

const Signup = props => {

  const submitSignup = evt => {
    evt.preventDefault();



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

      </form>
    </div>
    </div>
  </>)
}
export default Signup
