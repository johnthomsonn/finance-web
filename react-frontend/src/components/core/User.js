import React, { useState } from 'react'
import NavBar from '../navbar/Navbar'
import SetMonth from '../other/SetMonth'
import MonthOverall from '../other/MonthOverall'
import CreateTransaction from '../other/CreateTransaction'
import AllTransactions from '../other/AllTransactions'
import './User.css'
import Footer from './Footer'

const User = props => {

  const [month, setMonth] = useState(new Date(Date.now()).toLocaleString('default', { month: 'long', year: 'numeric' }))
  const [transactions, setTransactions] = useState([]);

  const addTransaction = transaction => setTransactions([...transactions, transaction]);

  const updateSelectedMonth = newMonth => {
    setMonth(newMonth);
  }

  return (<>
    <NavBar {...props} />
    <div class="container-fluid user-container">

      <div class="set-month" >
        <SetMonth {...props} updateMonth={updateSelectedMonth} month={month} />
      </div>

      <div class="create-transaction">
        <CreateTransaction {...props} addTransaction={addTransaction} month={month} />
      </div>

      <div class="month-overall">
        <MonthOverall {...props} month={month} />
      </div>



      <div class="all-transactions">
        <AllTransactions {...props} month={month} />
      </div>

    </div>

    <Footer />

  </>)
}

export default User;
