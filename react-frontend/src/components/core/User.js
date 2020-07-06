import React, { useState } from 'react'
import NavBar from '../navbar/Navbar'
import SetMonth from '../other/SetMonth'
import MonthOverall from '../other/MonthOverall'
import CreateTransaction from '../other/CreateTransaction'
import AllTransactions from '../other/AllTransactions'
import './User.css'

const User = props => {

  const [month, setMonth] = useState(new Date(Date.now()).toLocaleString('default', { month: 'long', year: 'numeric' }))

  return (<>
    <NavBar {...props} />

    <div class="container-fluid">

      <SetMonth {...props} />

      <MonthOverall {...props} />

      <CreateTransaction {...props} />

      <AllTransactions {...props} />

    </div>

  </>)
}

export default User;
