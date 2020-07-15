import React from "react";
import "./Transaction.css";

const Transaction = props => {

    const { id, amount, category, description, date, type, count } = props;

    const green = "#ccf0c7";
    const red = "#f2cbd2";

    const deleteTransaction = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${JSON.parse(window.sessionStorage.getItem("user")).username}/transaction/${id}`, {
            method: "DELETE",
            mode: "cors",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    props.error(data.error)
                }
                else {
                    props.removeTransaction(id)
                }
            })
            .catch(error => props.error(error));
    };

    return (<>
        <tr style={{ backgroundColor: type == "Income" ? green : red }}>
            <th scope="row">{count}</th>
            <td>£{amount}</td>
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