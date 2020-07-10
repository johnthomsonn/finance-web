import React from 'react'
import "./AllTransactions.css"

const AllTransactions = props => {

    return (<>
        <div className="all-transactions-div">
            <h5>All Transactions for {props.month}</h5>

            <div className="table-div">
                <table className="table">

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>

                    <tbody>

                    </tbody>

                </table>
            </div>

        </div>
    </>);
}

export default AllTransactions;