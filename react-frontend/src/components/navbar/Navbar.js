import React, {useState, useEffect} from 'react'

import './Navbar.css'
import {Link, Redirect} from 'react-router-dom'
import {isSignedIn, signOut} from '../../js/methods'

const Navbar = props => {

const [signedIn, setSignedIn] = useState(false)
useEffect(() => checkIfSignedIn())

const checkIfSignedIn =() => {
  setSignedIn(isSignedIn())
}

return (<>
  <nav className="navbar navbar-expand-md bg-dark container-fluid" >

  <div className="navbar-brand">Finance Tracker</div>


    <ul className="navbar-nav ">
      <li className="nav-item">
        <Link to="/" className="nav-link"> Home </Link>
      </li>
      {signedIn && (<li className="nav-item">
        <Link to="/" className="nav-link"> {signedIn ? `${JSON.parse(window.sessionStorage.getItem("user")).username}`  : "not signed in" } </Link>
      </li>)}

    </ul>

    <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navCollapse">
      <span className="navbar-toggler-icon">button</span>
      </button>

    <div className="collapse navbar-collapse" id="navCollapse">
    <ul className="navbar-nav ml-auto">
    { !signedIn ? (<>
      <li className="nav-item">
        <Link to="/signup" className="nav-link"> Sign up </Link>
      </li>
      <li className="nav-item">
        <Link to="/signin" className="nav-link"> Sign in </Link>
      </li>
    </>) : (
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={() => signOut(() => props.history.push("/"))}> Sign out</Link>
      </li>
    )}
    </ul>
    </div>

  </nav>
</>)

}

export default Navbar
