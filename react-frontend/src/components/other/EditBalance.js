import React, { useState } from "react";
import "./EditBalance.css";

const EditBalance = props => {


    const [error, setError] = useState("");

    const updateBalance = event => {
        event.preventDefault();
        const bal = document.getElementById("balance").value;
        if (validateBalance(bal)) {
            serverCallToUpdateBalance(bal);
        }
    }

    const serverCallToUpdateBalance = bal => {

    }

    const validateBalance = bal => {
        let isValid = false;
        if (!(/^\d+(\.\d{1,2})?$/gi).test(bal)) {
            setError("Invalid balance");
        }
        else {
            setError("")
            isValid = true;
        }
        return isValid;
    }

    return (<>

        <div className="edit-balance-div">
            <form onSubmit={updateBalance} >
                <label htmlFor="balance">
                    Edit balance:
                </label>

                <input type="number" name="balance-input" id="balance" className="balance-input" step=".01" />
                <button type="submit" >Update</button>

            </form>
            <div
                className="alert alert-danger"
                style={{ display: error.length ? "" : "none" }}
            >
                {error}
            </div>
        </div>

    </>);
};

export default EditBalance;