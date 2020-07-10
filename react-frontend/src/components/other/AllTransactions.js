import React from 'react'
import "./AllTransactions.css"

const AllTransactions = props => {

    return (<>
        <div className="all-transactions-div">
            <h5>All Transactions for {props.month}</h5>

        </div>
    </>);
}

export default AllTransactions;