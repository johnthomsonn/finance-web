import React, { useEffect, useState } from "react";
import "./MonthOverall.css";

const MonthOverall = props => {


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
        return obj;
    };

    const doTable = () => {
        const categoriesObj = sortTransactions();
        const categoryArr = Object.keys(categoriesObj);
        const vals = [];
        for (let k in categoriesObj) {
            vals.push(categoriesObj[k]);
        }

        const c = categoryArr.map((c, i) => {
            return (
                <tr key={i}>
                    <td>{c}</td>
                    <td>{vals[i]}</td>
                </tr>
            )
        })
        return c;
    };

    return (<>

        <div className="month-overall-div">
            <h5>{props.month} Summary</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {doTable()}
                </tbody>
            </table>

        </div>
    </>);
};

export default MonthOverall;