import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, Redirect } from "react-router-dom";
import { isSignedIn, signOut } from "../../js/methods";

const Navbar = props => {

  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => checkIfSignedIn());
  useEffect(() => updateBalanceOnChange(), [props.balance]);


  const updateBalanceOnChange = () => {
    setBalance(props.balance);
  };

  const checkIfSignedIn = () => {
    const isUserSignedIn = isSignedIn();
    if (isUserSignedIn) {
      const userJSON = JSON.parse(window.sessionStorage.getItem("user"));
      if (userJSON) {
        setUsername(userJSON.username);
      }
    }
    setSignedIn(isUserSignedIn);
  };

  return (<>
    <nav className="navbar navbar-expand-md bg-dark container-fluid" >

      <div className="navbar-brand">Finance Tracker</div>


      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link to="/" className="nav-link"> Home </Link>
        </li>
        {signedIn && (<li className="nav-item">
          <Link to={`/${username}`} className="nav-link"> {signedIn && `${username}`} </Link>
        </li>)}

      </ul>

      <ul className="nav-balance navbar-nav">
        <li className="nav-item">
          <span className="nav-linkk">Balance: £{balance}</span>
        </li>
      </ul>

      <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navCollapse">
        <span className="navbar-toggler-icon">button</span>
      </button>

      <div className="collapse navbar-collapse" id="navCollapse">
        <ul className="navbar-nav ml-auto">
          {!signedIn ? (<>
            <li className="nav-item">
              <Link to="/signup" className="nav-link"> Sign up </Link>
            </li>
            <li className="nav-item">
              <Link to="/signin" className="nav-link"> Sign in </Link>
            </li>
          </>) : (
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => signOut(() => <Redirect to="/" />)}> Sign out</Link>
              </li>
            )}
        </ul>
      </div>

    </nav>
  </>);

};

export default Navbar;