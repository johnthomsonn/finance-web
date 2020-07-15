import React, { useState, useEffect } from "react";
import NavBar from "../navbar/Navbar";
import SetMonth from "../other/SetMonth";
import MonthOverall from "../other/MonthOverall";
import CreateTransaction from "../other/CreateTransaction";
import AllTransactions from "../other/AllTransactions";
import "./User.css";
import Footer from "./Footer";

const User = props => {

  const [month, setMonth] = useState(new Date(Date.now()).toLocaleString("default", { month: "long", year: "numeric" }));
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => getAllTransactions(), [month]);
  useEffect(() => setUserBalance(), []);

  const addTransaction = transaction => {
    alterBalance(transaction);
    setTransactions([...transactions, transaction]);
  };

  const alterBalance = transaction => {
    if (transaction.transactionType == "income" || transaction.transactionType == "Income")
      setBalance(Number(balance) + transaction.amount);
    else
      setBalance(Number(balance) - transaction.amount);
  };

  const removeTransaction = transactionId => {
    const newTransactions = transactions.filter(t => t._id !== transactionId);
    setTransactions(newTransactions);
  };

  const updateSelectedMonth = newMonth => {
    setMonth(newMonth);
  };

  const setUserBalance = () => {
    setBalance(window.sessionStorage.getItem("balance"));
  };

  const getAllTransactions = () => {
    const monthSplit = month.split(" ");
    const m = monthSplit[0].substr(0, 3) + "-" + monthSplit[1].substr(2, 4);
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
      .catch(err => console.log(err));
  };

  return (<>
    <NavBar {...props} balance={balance} />
    <div className="container-fluid user-container">

      <div className="set-month" >
        <div
          className="alert alert-danger"
          style={{ display: error.length ? "" : "none" }}
        >
          {error}
        </div>
        <SetMonth {...props} updateMonth={updateSelectedMonth} month={month} />
      </div>

      <div className="create-transaction">
        <CreateTransaction {...props} addTransaction={addTransaction} month={month} alterBalance={alterBalance} />
      </div>

      <div className="month-overall">
        <MonthOverall {...props} month={month} transactions={transactions} />
      </div>


      <div className="all-transactions">
        <AllTransactions {...props} month={month} transactions={transactions} error={setError} removeTransaction={removeTransaction} />
      </div>

    </div>

    <Footer />

  </>);
};

export default User;
