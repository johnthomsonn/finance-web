import React from "react"
import "./Transaction.css"

const Transaction = props => {

    const { id, amount, category, description, date, type } = props;

    return (<>
        <tr>
            <th scope="row">{id}</th>
            <td>{amount}</td>
            <td>{date}</td>
            <td>{description}</td>
            <td>{category}</td>
            <td>{type}</td>
        </tr>
    </>)
}
export default Transaction;