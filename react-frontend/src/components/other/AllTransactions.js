import React from "react";
import "./AllTransactions.css";
import Transaction from "./Transaction";

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
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.transactions.map((t, i) => {
                            return <Transaction key={i}
                                count={i + 1}
                                amount={t.amount}
                                description={t.description}
                                category={t.category}
                                type={t.transactionType}
                                date={t.created}
                                error={props.error}
                                id={t._id}
                                removeTransaction={props.removeTransaction}
                            />
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    </>);
};

export default AllTransactions;