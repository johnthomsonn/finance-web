import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "../navbar/Navbar";
import "./Home.css";


const Home = props => {

  const [balance, setBalance] = useState("");

  useEffect(() => trySetBalance(), []);

  const trySetBalance = () => {
    if (typeof window !== undefined) {
      setBalance(window.sessionStorage.getItem("balance"));
    }
  }

  return (<>

    <NavBar {...props} balance={balance} />


    <header>
      <h1>Finance Tracker</h1>
      <h6> Keeping track of your money</h6>
    </header>

    <section id="about">
      <p>
        Finance tracker allows you to create your own private profile where you can then add each financial transaction
        and categorise them which allows you to see exactly where your money is going each month.
      </p>
    </section>

    <section id="ex">
      <p>Examples could go here</p>
    </section>

    <Footer />

  </>);
};
export default Home;
