import React, { useEffect, useState } from "react";
import "./MonthOverall.css";
import { find } from "lodash";

const MonthOverall = props => {

    const formatter = new Intl.NumberFormat('en-GB', { style: "currency", currency: "GBP" });

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
                    <td>{formatter.format(vals[i])}</td>
                </tr>
            )
        })
        return c;
    };

    // exludes savings transactions
    const findTotalByType = type => {
        let sum = 0;
        for (let t in props.transactions) {
            const transactionType = props.transactions[t].transactionType
            const cat = props.transactions[t].category
            if(cat !== "from savings" && cat !== "to savings" && cat != "save the pennies")
            {
                if (transactionType === type) {
                    sum += props.transactions[t].amount;
                }
            }
        }
        return sum;
    };

    const findNet = () => {
        const income = findTotalByType("Income");
        const expend = findTotalByType("Expenditure");
        return income - expend;
    };

    const findToSavings = () => {
        let sum = 0;
        for (let t in props.transactions) {
            const transactionType = props.transactions[t].transactionType
            const cat = props.transactions[t].category
            if(cat === "to savings" || cat === "save the pennies")
            {
                sum += props.transactions[t].amount;
               
            }
        }
        return sum;
    }

    const findFromSavings = () => {
        let sum = 0;
        for (let t in props.transactions) {
            const transactionType = props.transactions[t].transactionType
            const cat = props.transactions[t].category
            if(cat === "from savings")
            {
                sum += props.transactions[t].amount;
               
            }
        }
        return sum;
    }

    const findNetSavings = () => {
        const to = findToSavings();
        const from = findFromSavings();
        return to - from;
    }

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

            <hr style={{ border: "4px solid #e8e7e1" }} />
            {/* Savings net */}
            <div style={{textAlign : "center"}}>Savings:</div>
            <table className="table">
                <thead >
                </thead>
                <tbody>
                    <tr>
                        <td>
                            To Savings:
                    </td>
                        <td style={{ backgroundColor: "#ccf0c7" }}>
                            {formatter.format(findToSavings())}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            From Savings:
                    </td>
                        <td style={{ backgroundColor: "#f2cbd2" }}>
                            {formatter.format(findFromSavings())}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Net
                    </td>
                        <td style={{ backgroundColor: findNetSavings() > 0 ? "#ccf0c7" : "#f2cbd2" }}>
                            {formatter.format(findNetSavings())}
                        </td>
                    </tr>
                </tbody>

            </table>

            <hr style={{ border: "4px solid #e8e7e1" }} />
            {/* Net spend exluding savings*/}
            <div style={{textAlign : "center"}}>Net exluding savings:</div>
            <table className="table">
                <thead >
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Total in:
                    </td>
                        <td style={{ backgroundColor: "#ccf0c7" }}>
                            {formatter.format(findTotalByType("Income"))}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Total out:
                    </td>
                        <td style={{ backgroundColor: "#f2cbd2" }}>
                            {formatter.format(findTotalByType("Expenditure"))}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Net
                    </td>
                        <td style={{ backgroundColor: findNet() > 0 ? "#ccf0c7" : "#f2cbd2" }}>
                            {formatter.format(findNet())}
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>
    </>);
};

export default MonthOverall;