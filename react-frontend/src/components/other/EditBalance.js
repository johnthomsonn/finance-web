import React, { useState } from "react";
import "./EditBalance.css";

const EditBalance = props => {


    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    const updateBalance = event => {
        event.preventDefault();
        const bal = document.getElementById("balance").value;
        if (validateBalance(bal)) {
            serverCallToUpdateBalance(bal);
        }
    }

    const serverCallToUpdateBalance = bal => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/${JSON.parse(window.sessionStorage.getItem("user")).username}/edit/balance`, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ balance: bal })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    updateBalanceOnSuccess(data.balance);
                    document.getElementById("balance").value = "";
                    setMessage("Balance update succesful, you now have £" + data.balance);
                }
            })
            .catch(err => {
                console.log(err);
                setError("There was an issue with the server request.");
            });
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

    const updateBalanceOnSuccess = updatedBalance => {
        props.updateBalance(updatedBalance);
    }

    return (<>

        <div className="edit-balance-div">
            <form onSubmit={updateBalance} >
                <label htmlFor="balance">
                    Edit balance:
                </label>

                <input type="number" name="balance-input" id="balance" placeholder={props.balance} className="balance-input" step=".01" />
                <button type="submit" >Update</button>

            </form>
            <div
                className="alert alert-danger"
                style={{ display: error.length ? "" : "none" }}
            >
                {error}
            </div>
            <div
                className="alert alert-primary"
                style={{ display: message.length ? "" : "none" }}
            >
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>

    </>);
};

export default EditBalance;