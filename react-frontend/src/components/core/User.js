import React, { useState, useEffect } from 'react'
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
  const [error, setError] = useState("")

  useEffect(() => getAllTransactions(), []);

  const addTransaction = transaction => setTransactions([...transactions, transaction]);

  const updateSelectedMonth = newMonth => {
    setMonth(newMonth);
  }

  const getAllTransactions = () => {
    const monthSplit = month.split(" ");
    const m = monthSplit[0].substr(0, 3) + "-" + monthSplit[1].substr(2, 4)
    fetch(`${process.env.REACT_APP_SERVER_URL}/user/${JSON.parse(window.sessionStorage.getItem("user")).username}/month/${m}/transactions`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        }
        else {
          setTransactions(data.transactions)
          setError("")
        }
      })
      .catch(err => console.log(err))
  }

  return (<>
    <NavBar {...props} />
    <div class="container-fluid user-container">

      <div class="set-month" >
        <div
          className="alert alert-danger"
          style={{ display: error.length ? "" : "none" }}
        >
          {error}
        </div>
        <SetMonth {...props} updateMonth={updateSelectedMonth} month={month} />
      </div>

      <div class="create-transaction">
        <CreateTransaction {...props} addTransaction={addTransaction} month={month} />
      </div>

      <div class="month-overall">
        <MonthOverall {...props} month={month} />
      </div>



      <div class="all-transactions">
        <AllTransactions {...props} month={month} transactions={transactions} />
      </div>

    </div>

    <Footer />

  </>)
}

export default User;
