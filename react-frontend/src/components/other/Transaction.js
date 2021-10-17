import React from "react";
import "./Transaction.css";

const Transaction = props => {

    const { id, amount, category, description, date, type, count } = props;

    const green = "#ccf0c7";
    const red = "#f2cbd2";
    const lightgreen = '#ecf0b6';
    const lightred = '#e8cdae';

    const formatter = new Intl.NumberFormat('en-GB', { style: "currency", currency: "GBP" });

    const deleteTransaction = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${JSON.parse(window.sessionStorage.getItem("user")).username}/transaction/${id}`, {
            method: "DELETE",
            mode: "cors",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    props.error(data.error);
                }
                else {
                    props.removeTransaction(id);
                    window.sessionStorage.setItem("balance", data.balance);
                    props.setBalance(data.balance);
                }
            })
            .catch(error => props.error(error));
    };

    const setBackgroundColour = () => {
        if(type === "Income")
        {
            if(category === "from savings")
            {
                return lightred
            }
            else
            {
                return green;
            }
        }
        else
        {
            if(category === "to savings" || category === "save the pennies")
            {
                return lightgreen
            }
            else
            {
                return red
            }
        }
    }

    return (<>
        <tr style={{ backgroundColor: setBackgroundColour() }}>
            <th scope="row">{count}</th>
            <td>{formatter.format(amount)}</td>
            <td>{new Date(date).toLocaleDateString("default", {
                day: "numeric", month: "short", year: "numeric"
            })}</td>
            <td>{description}</td>
            <td>{category}</td>
            <td>{type}</td>
            <td><button className="custom" onClick={deleteTransaction}>X</button></td>
        </tr>
    </>);
};
export default Transaction;