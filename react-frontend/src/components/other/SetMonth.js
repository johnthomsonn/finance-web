import React, { useState, useEffect } from "react";
import "./SetMonth.css";

const SetMonth = props => {

    const [months, setMonths] = useState([]);

    useEffect(() => setMonthState(), []);

    const setMonthState = () => {
        const monthArray = [];
        const currentYear = new Date(Date.now()).getFullYear();
        for (let y = currentYear; y >= currentYear - 1; y--) {
            for (let m = 0; m < 12; m++) {
                monthArray.push(new Date(y, m, 1).toLocaleString("default", { month: "long", year: "numeric" }));
            }
        }
        setMonths(monthArray);
    };


    const handleMonthChange = () => {
        const selected = document.getElementById("setMonth").value;
        props.updateMonth(selected);
    };



    return (<>
        <div className="set-month-div">
            <h5>Choose Month</h5>

            <select name="month" id="setMonth" onChange={handleMonthChange} value={props.month}>
                {months.map((m, i) => <option key={i} value={m} >{m}</option>)}
            </select>

        </div>
    </>);
};

export default SetMonth;