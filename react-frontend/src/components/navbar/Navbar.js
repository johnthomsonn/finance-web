import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = props => {


return (<>
  <div className="navbar navbar-expand-md bg-dark container-fluid">



    <ul className="navbar-nav ">
      <li className="nav-item">
        <Link to="/" className="nav-link" > Home </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link"> USername </Link>
      </li>
    </ul>

    <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navCollapse">
      <span className="navbar-toggler-icon">button</span>
      </button>

    <div className="collapse navbar-collapse" id="navCollapse">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/signup" className="nav-link"> Sign up </Link>
      </li>
      <li className="nav-item">
        <Link to="/signin" className="nav-link"> Sign in </Link>
      </li>
      <li className="nav-item">
        <Link to="/signout" className="nav-link"> Sign out</Link>
      </li>
    </ul>
    </div>

  </div>
</>)

}

export default Navbar
