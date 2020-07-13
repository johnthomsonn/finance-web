import React, { useState, useEffect } from 'react'
import './CreateTransaction.css'
import { split } from 'lodash'
import { transactionCategories } from "./Categories"

const CreateTransaction = props => {

    const [input, setInput] = useState({
        amount: "",
        description: ""
    })

    const [error, setError] = useState("")

    const [ttype, setType] = useState("Income")

    const [incomeCategories, setIncomeCategories] = useState([])
    const [expenditureCategories, setExpenditureCategories] = useState([])

    const [currMonth, setCurrMonth] = useState(props.month.split(" ")[0])
    const [year, setYear] = useState(props.month.split(" ")[1])

    const [currentDate, setCurrentDate] = useState(new Date(Date.now()).toLocaleString('default', { month: 'long', year: 'numeric' }))

    useEffect(() => {
        preSelectDay();
        preSelectMonth()
    }, [props.month]);

    useEffect(() => {
        const months = getMonthStrings;
        const currMonth = props.month.split(" ")[0];

        const r = months.filter(m => m === currMonth)
        setCurrMonth(r.toString())

    }, [props.month])

    useEffect(() => getCategories(), []);

    const handleMonthChange = () => {
        setCurrMonth(document.getElementById("month").value)
    }

    const getCategories = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${JSON.parse(window.sessionStorage.getItem("user")).username}/transaction/types`, {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setIncomeCategories(data.income);
                setExpenditureCategories(data.expenditure);
            })
            .catch(err => console.log(err))
    }

    const preSelectDay = () => {
        const day = new Date(Date.now()).getDate()
        document.getElementById("day").selectedIndex = day - 1;
    }

    const preSelectMonth = () => {
        const monthNumber = new Date(Date.now()).getMonth();
        document.getElementById("month").selectedIndex = monthNumber;
    }

    const handleYearChange = () => {
        const year = document.getElementById("year").value;
        setYear(year);
    }

    const handleInputChange = name => event => {
        const change = event.target.value
        setInput({ ...input, [name]: change })
        if (error)
            setError("")
    }

    const submitCreateTransaction = e => {
        e.preventDefault();
        if (input.amount > 0 && input.description.length > 0) {
            createTransaction();
        }
        else {
            setError("Please ensure amount is greater than 0 and the description field is not empty")
        }
    }

    const createTransaction = () => {
        const type = document.getElementById("type").value;
        const category = document.getElementById("category").value;
        const day = document.getElementById("day").value;
        const date = year + "-" + getMonthNumber(currMonth) + "-" + day;
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${JSON.parse(window.sessionStorage.getItem("user")).username}/transaction`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: input.description,
                amount: input.amount,
                transactionType: type,
                category: category,
                date: date
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    if (isTransactionInActiveMonth(data.transaction))
                        props.addTransaction(data.transaction);
                    window.sessionStorage.setItem("balance", data.balance)
                    resetInputFields();
                }
            })
            .catch(err => {
                console.log(err);
                setError(err);
            })
    }

    const isTransactionInActiveMonth = trans => {
        const splitDate = trans.created.split("-");
        return splitDate[0] == year && getMonthNumber(splitDate[1]) == props.month.split(" ")[1]
    }

    const resetInputFields = () => {
        setInput({
            amount: "",
            description: ""
        })
        setError("")
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

    const getMonthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const setCategoryType = t => {
        const val = document.getElementById("type").value;
        setType(val)
    }




    return (<>

        <div className="alert alert-danger" style={{ display: error.length > 0 ? "" : "none", position: "absolute", top: "10%", borderRadius: "10px" }}>
            {error}
        </div>
        <div className="create-transaction-div">
            <h5>Add New Transaction</h5>
            <form onSubmit={submitCreateTransaction}>
                <input type="number" value={input.amount} placeholder="Amount:" onChange={handleInputChange("amount")} />

                <input type="text" value={input.description} placeholder="Description" autoComplete="off" style={{ width: "300px" }} onChange={handleInputChange("description")} />

                <select name="day" style={{ width: "30px" }} id="day">
                    {days().map(day => <option key={day} value={day}>{day}</option>)}
                </select>

                <select name="month" id="month" value={currMonth} onChange={handleMonthChange}>
                    {getMonthStrings.map((month, index) => <option key={index} value={month}  >{month} </option>)}
                </select>

                <select type="text" id="year" value={year} onChange={handleYearChange} style={{ width: "50px" }} >
                    <option value={currentDate.split(" ")[1]} >{currentDate.split(" ")[1]}</option>
                    <option value={currentDate.split(" ")[1] - 1} >{currentDate.split(" ")[1] - 1}</option>
                </select>

                <select name="type" id="type" onChange={setCategoryType}>
                    <option value="Income" >Income</option>
                    <option value="Expenditure" >Expenditure</option>
                </select>

                <select name="category" style={{ width: "70px" }} id="category">
                    {ttype === "Income" ? incomeCategories.map((t, i) => <option key={i} value={t}>{t}</option>)
                        : expenditureCategories.map((t, i) => <option key={i} value={t}>{t}</option>)}

                </select>

                <button type="submit" > Add Transaction </button>
            </form>
        </div>
    </>)
}

export default CreateTransaction;