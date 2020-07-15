import React, { useEffect, useState } from "react";
import "./MonthOverall.css";

const MonthOverall = props => {


    const [transactions, setTransactions] = useState([]);
    const [sorted, setSorted] = useState({});

    useEffect(() => setTransactions(props.transactions), []);
    //useEffect(() => sortTransactions(), [])

    const sortTransactions = () => {
        let obj = {};
        props.transactions.map(t => {
            const cat = t.category;
            const amount = t.amount;
            if (obj.hasOwnProperty(cat)) {
                let total = obj[cat];
                total += amount;
                obj = {
                    ...obj, [cat]: total
                };
            }
            else {
                obj = { ...obj, [cat]: amount }
            }
        });
        //setSorted(obj)
        //return obj;
        console.log(obj);
    };

    const doTable = () => {
        const categories = sortTransactions();


    };

    return (<>
        <div className="month-overall-div">
            <h5>{props.month} Summary</h5>
            {sortTransactions()}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>

        </div>
    </>);
};

export default MonthOverall;