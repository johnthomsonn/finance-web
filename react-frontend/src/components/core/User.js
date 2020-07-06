import React, { useState } from 'react'
import NavBar from '../navbar/Navbar'
import SetMonth from '../other/SetMonth'

const User = props => {

  const [month, setMonth] = useState(new Date(Date.now()).toLocaleString('default', { month: 'long', year: 'numeric' }))

  return (<>
    <NavBar {...props} />

    <SetMonth {...props} />


  </>)
}

export default User;
