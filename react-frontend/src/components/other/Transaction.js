import React from "react"
import "./Transaction.css"

const Transaction = props => {

    const { id, amount, category, description, date, type } = props;

    const green = "#ccf0c7";
    const red = "#f2cbd2";

    return (<>
        <tr style={{ backgroundColor: type == "Income" ? green : red }}>
            <th scope="row">{id}</th>
            <td>£{amount}</td>
            <td>{new Date(date).toLocaleDateString('default', {
                day: 'numeric', month: 'short', year: 'numeric'
            })}</td>
            <td>{description}</td>
            <td>{category}</td>
            <td>{type}</td>
            <td><button className="custom">X</button></td>
        </tr>
    </>)
}
export default Transaction;