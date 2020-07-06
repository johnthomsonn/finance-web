import React, { useState } from 'react'
import './CreateTransaction.css'
import { split } from 'lodash'
import { transactionCategories } from "./Categories"

const CreateTransaction = props => {

    const [input, setInput] = useState({
        amount: "",
        description: "",
        day: "",
        type: "",
        category: ""
    })


    const handleInputChange = name => event => {

    }

    const submitCreateTransaction = (e) => {
        e.preventDefault();
    }

    const days = () => {
        const allDays = [];
        const splitDate = props.month.split(" ");
        const end = new Date(splitDate[1], getMonthNumber(splitDate[0]), 0).getDate();
        for (let i = 1; i <= end; i++) {
            allDays.push(i);
        }
        return allDays;
    }

    const getMonthNumber = monthString => {
        switch (monthString) {
            case "January":
                return 1;
            case "February":
                return 2;
            case "March":
                return 3;
            case "April":
                return 4;
            case "May":
                return 5;
            case "June":
                return 6;
            case "July":
                return 7;
            case "August":
                return 8;
            case "September":
                return 9;
            case "October":
                return 10;
            case "November":
                return 11;
            case "December":
                return 12;
        }
    }

    return (<>
        <div className="create-transaction-div">
            <h5>Add New Transaction</h5>
            <form onSubmit={submitCreateTransaction}>
                <input type="number" value={input.amount} placeholder="Amount:" />
                <input type="text" value={input.description} placeholder="Description" autoComplete="off" style={{ width: "300px" }} />
                <select name="day" style={{ width: "30px" }}>
                    {days().map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <input type="text" value={props.month} disabled />
                <select name="type" >
                    <option value="Income" >Income</option>
                    <option value="Expenditure" >Expenditure</option>
                </select>
                <select name="category" style={{ width: "70px" }}>
                    {transactionCategories.map((t, i) => <option key={i} value={t}>{t}</option>)}
                </select>
            </form>
        </div>
    </>)
}

export default CreateTransaction;