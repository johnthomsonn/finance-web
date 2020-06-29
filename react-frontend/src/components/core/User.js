import React from 'react'
import NavBar from '../navbar/Navbar'

const User = props => {

  return (<>
    <NavBar {...props} />
    {props.match.params.user}
  </>)
}

export default User;
